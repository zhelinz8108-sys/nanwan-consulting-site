# Nanwan Consulting Website

Official Next.js 15 website for 南湾咨询（无锡）有限公司.

## Stack

- Next.js 15 App Router
- React 19
- TypeScript

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
npm run start
```

## Deployment Note

Set `NEXT_PUBLIC_SITE_URL` in your deployment environment so generated metadata,
`robots.txt`, and `sitemap.xml` use your real production domain.

For the inquiry form, configure at least one delivery channel before going live:

- SMTP settings (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, etc.) for email delivery
- Optional `INQUIRY_FILE_PATH` for self-hosted file persistence outside the repo

Do not commit inquiry records or store them under version-controlled directories.
