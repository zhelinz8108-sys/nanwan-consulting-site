/**
 * 模拟50个客户留言测试
 * 测试 /api/inquiry 接口的正确性和邮件发送功能
 */

const BASE_URL = process.env.BASE_URL || "http://localhost:3100";
const REQUEST_COUNT = Number(process.env.TEST_REQUESTS || "5");

// 50个模拟客户数据
const customers = [
  { name: "张三", contact: "13800138001", message: "想了解留学美国的流程" },
  { name: "李娜", contact: "lina@qq.com", message: "孩子高二，想咨询英国本科申请" },
  { name: "王伟", contact: "13900139002", message: "一家三口想搬去纽约，需要安居服务" },
  { name: "赵敏", contact: "zhaomin@163.com", message: "想了解综合顾问服务的费用" },
  { name: "刘洋", contact: "13700137003", message: "MBA申请咨询" },
  { name: "陈芳", contact: "chenfang@gmail.com", message: "想咨询加拿大移民后的安居问题" },
  { name: "杨磊", contact: "13600136004", message: "孩子初三，想了解美高申请" },
  { name: "周婷", contact: "zhouting@outlook.com", message: "新加坡工作签证+租房需要帮助" },
  { name: "吴强", contact: "13500135005", message: "咨询澳洲留学" },
  { name: "郑雪", contact: "zhengxue@126.com", message: "两个孩子同时申请美国大学" },
  { name: "孙浩", contact: "13400134006", message: "硅谷工作，需要租房协调" },
  { name: "朱丽", contact: "zhuli@qq.com", message: "想把孩子送去英国读初中" },
  { name: "马超", contact: "13300133007", message: "跨境电商业务咨询" },
  { name: "胡蝶", contact: "hudie@hotmail.com", message: "日本留学相关信息" },
  { name: "林峰", contact: "13200132008", message: "纽约买房投资咨询" },
  { name: "黄丽", contact: "huangli@gmail.com", message: "全家移居加州，需要全套安居服务" },
  { name: "徐明", contact: "13100131009", message: "孩子想学艺术，申请帕森斯" },
  { name: "何静", contact: "hejing@icloud.com", message: "伦敦租房需要帮忙" },
  { name: "高强", contact: "13000130010", message: "想了解你们的服务价格" },
  { name: "梁雪", contact: "liangxue@sina.com", message: "咨询港澳留学" },
  { name: "谢涛", contact: "12900129011", message: "法国商学院申请" },
  { name: "韩冰", contact: "hanbing@foxmail.com", message: "东京租房+生活指导" },
  { name: "唐晨", contact: "12800128012", message: "博士申请咨询" },
  { name: "冯琳", contact: "fenglin@qq.com", message: "家庭移居波士顿，需要学区分析" },
  { name: "董鹏", contact: "12700127013", message: "企业海外分公司设立咨询" },
  { name: "曹颖", contact: "caoying@gmail.com", message: "德国工科留学" },
  { name: "程光", contact: "12600126014", message: "旧金山安居协调" },
  { name: "蔡洁", contact: "caijie@163.com", message: "想了解南湾咨询的背景和资质" },
  { name: "彭飞", contact: "12500125015", message: "孩子去美国读研，需要全程规划" },
  { name: "邓瑶", contact: "dengyao@outlook.com", message: "温哥华租房" },
  { name: "许畅", contact: "12400124016", message: "商务签证相关咨询" },
  { name: "傅珊", contact: "fushan@qq.com", message: "双语教育规划" },
  { name: "沈阳", contact: "12300123017", message: "洛杉矶买房和租房都想了解" },
  { name: "曾琪", contact: "zengqi@gmail.com", message: "新西兰留学费用评估" },
  { name: "丁磊", contact: "12200122018", message: "合作咨询，我是留学中介" },
  { name: "余芬", contact: "yufen@hotmail.com", message: "孩子六年级，想早做规划" },
  { name: "江涛", contact: "12100121019", message: "多伦多安居+孩子入学" },
  { name: "苏敏", contact: "sumin@icloud.com", message: "想了解你们和其他留学机构的区别" },
  { name: "潘浩", contact: "12000120020", message: "芝加哥大学MBA申请" },
  { name: "范冰", contact: "fanbing@126.com", message: "英国伦敦安居服务" },
  { name: "方圆", contact: "11900119021", message: "高中交换生项目咨询" },
  { name: "任真", contact: "renzhen@qq.com", message: "墨尔本租房协调" },
  { name: "石磊", contact: "11800118022", message: "跨境税务问题想咨询" },
  { name: "姚瑶", contact: "yaoyao@gmail.com", message: "瑞士酒店管理学院申请" },
  { name: "段誉", contact: "11700117023", message: "西雅图安居服务" },
  { name: "雷响", contact: "leixiang@163.com", message: "孩子想去韩国留学" },
  { name: "白雪", contact: "11600116024", message: "纽约短租+长租都需要" },
  { name: "邱峰", contact: "qiufeng@foxmail.com", message: "" },
  { name: "侯明", contact: "11500115025", message: "综合咨询服务怎么收费" },
  { name: "龙腾", contact: "longteng@outlook.com", message: "全家5口人移居美国，需要详细方案" },
];

async function runTest() {
  const customersToTest = customers.slice(0, Math.max(1, Math.min(REQUEST_COUNT, customers.length)));

  console.log("=".repeat(60));
  console.log("南湾咨询官网 — 咨询接口测试");
  console.log("=".repeat(60));
  console.log(`目标: ${BASE_URL}/api/inquiry`);
  console.log(`请求数: ${customersToTest.length}`);
  console.log("提示: 默认限流为 10 分钟 5 次，如需批量测试请临时提高 INQUIRY_RATE_LIMIT_MAX。");
  console.log(`测试时间: ${new Date().toLocaleString("zh-CN")}\n`);

  let success = 0;
  let fail = 0;
  let emailSent = 0;
  const errors = [];
  const start = Date.now();

  for (let i = 0; i < customersToTest.length; i++) {
    const c = customersToTest[i];
    try {
      const res = await fetch(`${BASE_URL}/api/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(c),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        success++;
        if (data.emailSent) emailSent++;
        process.stdout.write(`  [${String(i + 1).padStart(2)}] ✅ ${c.name} (${c.contact}) — 邮件: ${data.emailSent ? "✅" : "⏭️ 跳过"}\n`);
      } else {
        fail++;
        errors.push({ index: i + 1, customer: c.name, error: data.error || "unknown" });
        process.stdout.write(`  [${String(i + 1).padStart(2)}] ❌ ${c.name} — ${data.error}\n`);
      }
    } catch (err) {
      fail++;
      errors.push({ index: i + 1, customer: c.name, error: err.message });
      process.stdout.write(`  [${String(i + 1).padStart(2)}] ❌ ${c.name} — ${err.message}\n`);
    }
  }

  const elapsed = Date.now() - start;

  console.log("\n" + "=".repeat(60));
  console.log("测试结果汇总");
  console.log("=".repeat(60));
  console.log(`  总请求: ${customersToTest.length}`);
  console.log(`  成功:   ${success} ✅`);
  console.log(`  失败:   ${fail} ❌`);
  console.log(`  邮件已发: ${emailSent}`);
  console.log(`  耗时:   ${elapsed}ms (平均 ${Math.round(elapsed / customersToTest.length)}ms/请求)`);

  if (errors.length > 0) {
    console.log("\n失败详情:");
    errors.forEach((e) => console.log(`  #${e.index} ${e.customer}: ${e.error}`));
  }

  // Validate: edge cases
  console.log("\n" + "-".repeat(60));
  console.log("边界测试...");

  // Test 1: missing fields
  const r1 = await fetch(`${BASE_URL}/api/inquiry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "", contact: "" }),
  });
  console.log(`  空字段拒绝: ${r1.status === 400 ? "✅ PASS" : "❌ FAIL (status=" + r1.status + ")"}`);

  // Test 2: missing contact
  const r2 = await fetch(`${BASE_URL}/api/inquiry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "测试", contact: "" }),
  });
  console.log(`  缺少联系方式: ${r2.status === 400 ? "✅ PASS" : "❌ FAIL (status=" + r2.status + ")"}`);

  // Test 3: very long message (should be truncated)
  const r3 = await fetch(`${BASE_URL}/api/inquiry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "超长测试", contact: "test@test.com", message: "A".repeat(5000) }),
  });
  const d3 = await r3.json();
  console.log(`  超长留言处理: ${r3.ok && d3.ok ? "✅ PASS (已截断)" : "❌ FAIL"}`);

  // Test 4: optional message empty
  const r4 = await fetch(`${BASE_URL}/api/inquiry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "无留言", contact: "13000000000" }),
  });
  const d4 = await r4.json();
  console.log(`  无留言提交:   ${r4.ok && d4.ok ? "✅ PASS" : "❌ FAIL"}`);

  console.log("\n" + "=".repeat(60));
  console.log(`全部测试完成！共 ${success + 4} 项通过`);
  console.log("=".repeat(60));
}

runTest().catch(console.error);
