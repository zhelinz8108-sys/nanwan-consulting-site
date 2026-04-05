import { promises as fs } from "fs";
import path from "path";

import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

import { siteConfig } from "@/site-config";

const MAX_NAME_LEN = 100;
const MAX_CONTACT_LEN = 200;
const MAX_MESSAGE_LEN = 2000;
const MAX_HONEYPOT_LEN = 200;
const DEFAULT_RATE_LIMIT_MAX = 5;
const DEFAULT_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s()-]{5,19}$/;

type InquiryBody = {
  contact?: unknown;
  message?: unknown;
  name?: unknown;
  website?: unknown;
};

type InquiryEntry = {
  contact: string;
  message: string;
  name: string;
  time: string;
};

declare global {
  // eslint-disable-next-line no-var
  var __nanwanInquiryRateLimit: Map<string, number[]> | undefined;
}

const rateLimitStore =
  globalThis.__nanwanInquiryRateLimit ?? (globalThis.__nanwanInquiryRateLimit = new Map());

function readPositiveNumber(value: string | undefined, fallback: number) {
  const parsed = Number(value);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

const RATE_LIMIT_MAX = readPositiveNumber(process.env.INQUIRY_RATE_LIMIT_MAX, DEFAULT_RATE_LIMIT_MAX);
const RATE_LIMIT_WINDOW_MS = readPositiveNumber(
  process.env.INQUIRY_RATE_LIMIT_WINDOW_MS,
  DEFAULT_RATE_LIMIT_WINDOW_MS,
);

function sanitize(value: unknown, maxLen: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLen) : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isValidContact(contact: string) {
  return EMAIL_RE.test(contact) || PHONE_RE.test(contact);
}

function getClientIp(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return (
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-real-ip") ??
    req.headers.get("x-client-ip") ??
    "unknown"
  );
}

function isRateLimited(ip: string, now: number) {
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const recentRequests = (rateLimitStore.get(ip) ?? []).filter(
    (timestamp: number) => timestamp > windowStart,
  );

  if (recentRequests.length >= RATE_LIMIT_MAX) {
    rateLimitStore.set(ip, recentRequests);
    return true;
  }

  recentRequests.push(now);
  rateLimitStore.set(ip, recentRequests);
  return false;
}

function resolveInquiryFilePath() {
  const configuredPath = process.env.INQUIRY_FILE_PATH?.trim();

  if (!configuredPath) {
    return null;
  }

  return path.isAbsolute(configuredPath)
    ? configuredPath
    : path.join(process.cwd(), configuredPath);
}

async function persistInquiry(entry: InquiryEntry, filePath: string) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.appendFile(filePath, `${JSON.stringify(entry)}\n`, "utf8");
}

function getEmailConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "465");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const toEmail = process.env.NOTIFY_EMAIL || siteConfig.email;

  if (!host || !user || !pass) {
    return null;
  }

  return {
    host,
    pass,
    port,
    toEmail,
    user,
  };
}

async function sendNotificationEmail(
  entry: InquiryEntry,
  config: NonNullable<ReturnType<typeof getEmailConfig>>,
) {
  const safeName = escapeHtml(entry.name);
  const safeContact = escapeHtml(entry.contact);
  const safeMessage = escapeHtml(entry.message || "（未填写）");

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: { user: config.user, pass: config.pass },
  });

  const htmlBody = `
    <div style="font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #c67d4a; border-bottom: 2px solid #f3efe9; padding-bottom: 12px;">南湾咨询 — 新客户咨询</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr><td style="padding: 10px; color: #9a8b7c; width: 80px;">姓名</td><td style="padding: 10px; color: #2d2319; font-weight: 500;">${safeName}</td></tr>
        <tr style="background: #faf8f6;"><td style="padding: 10px; color: #9a8b7c;">联系方式</td><td style="padding: 10px; color: #2d2319; font-weight: 500;">${safeContact}</td></tr>
        <tr><td style="padding: 10px; color: #9a8b7c;">留言</td><td style="padding: 10px; color: #2d2319;">${safeMessage}</td></tr>
        <tr style="background: #faf8f6;"><td style="padding: 10px; color: #9a8b7c;">时间</td><td style="padding: 10px; color: #5c4e41;">${new Date(entry.time).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })}</td></tr>
      </table>
      <p style="margin-top: 20px; font-size: 13px; color: #9a8b7c;">此邮件由南湾咨询官网自动发送</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"南湾咨询" <${config.user}>`,
    to: config.toEmail,
    subject: `[南湾咨询] 新客户咨询 — ${entry.name}`,
    html: htmlBody,
    text: `新客户咨询\n姓名: ${entry.name}\n联系方式: ${entry.contact}\n留言: ${entry.message || "（未填写）"}\n时间: ${entry.time}`,
  });
}

export async function POST(req: NextRequest) {
  let body: InquiryBody;

  try {
    const parsed = await req.json();

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json({ error: "invalid payload" }, { status: 400 });
    }

    body = parsed as InquiryBody;
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const honeypot = sanitize(body.website, MAX_HONEYPOT_LEN);

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const name = sanitize(body.name, MAX_NAME_LEN);
  const contact = sanitize(body.contact, MAX_CONTACT_LEN);
  const message = sanitize(body.message, MAX_MESSAGE_LEN);

  if (!name || !contact) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }

  if (!isValidContact(contact)) {
    return NextResponse.json({ error: "invalid contact" }, { status: 400 });
  }

  const ip = getClientIp(req);
  const now = Date.now();

  if (isRateLimited(ip, now)) {
    return NextResponse.json({ error: "rate limited" }, { status: 429 });
  }

  const entry: InquiryEntry = {
    contact,
    message,
    name,
    time: new Date(now).toISOString(),
  };

  const emailConfig = getEmailConfig();
  const inquiryFilePath = resolveInquiryFilePath();

  let emailSent = false;
  let fileStored = false;

  if (inquiryFilePath) {
    try {
      await persistInquiry(entry, inquiryFilePath);
      fileStored = true;
    } catch (error) {
      console.error(
        "[inquiry] File persistence failed:",
        error instanceof Error ? error.message : "unknown error",
      );
    }
  }

  // Always persist to /tmp as backup (works on Vercel serverless)
  if (!fileStored) {
    try {
      const tmpPath = path.join("/tmp", "inquiries.jsonl");
      await fs.appendFile(tmpPath, `${JSON.stringify(entry)}\n`, "utf8");
      fileStored = true;
    } catch {
      // /tmp write failed, continue anyway
    }
  }

  if (emailConfig) {
    try {
      await sendNotificationEmail(entry, emailConfig);
      emailSent = true;
    } catch (error) {
      console.error(
        "[inquiry] Email send failed:",
        error instanceof Error ? error.message : "unknown error",
      );
    }
  }

  return NextResponse.json({ ok: true, emailSent, fileStored });
}
