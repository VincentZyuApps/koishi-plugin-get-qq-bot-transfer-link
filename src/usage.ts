import { readFileSync } from 'fs'
import { resolve } from 'path'

const pkg = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8'))

// ============ 🎨 折叠分区样式（背景 / 边框 / 圆角，适配 WebUI 明暗主题） ============
const detailsStyle = 'margin:10px 0;border:1px solid var(--k-color-border, #909399);border-radius:8px;background:var(--k-card-bg, transparent);color:var(--k-text-dark, inherit);overflow:hidden;box-shadow:var(--k-card-shadow, 0 1px 3px rgb(0 0 0 / 12%));transition:var(--color-transition, border-color .2s ease, background-color .2s ease)'
const summaryStyle = 'padding:9px 12px;background:var(--k-hover-bg, rgba(127, 127, 127, .12));color:var(--k-text-dark, inherit);cursor:pointer;user-select:none'
const detailsBodyStyle = 'padding:6px 14px 12px;border-top:1px solid var(--k-color-divider, rgba(127, 127, 127, .28));background:var(--k-card-bg, transparent);color:var(--k-text-dark, inherit)'

export const usage = `
<h1>🤖 获取官Bot配置链接</h1>
<h2>📦 v${pkg.version}</h2>

<p>
  <a href="https://www.npmjs.com/package/koishi-plugin-get-qq-bot-transfer-link" target="_blank">
    <img src="https://img.shields.io/npm/v/koishi-plugin-get-qq-bot-transfer-link?style=flat-square&logo=npm" alt="npm version">
  </a>
  <a href="https://npm-stat.com/charts.html?package=koishi-plugin-get-qq-bot-transfer-link" target="_blank">
    <img src="https://img.shields.io/npm/dm/koishi-plugin-get-qq-bot-transfer-link?style=flat-square&logo=npm" alt="npm downloads">
  </a>
  <br>
  <a href="https://github.com/VincentZyuApps/koishi-plugin-get-qq-bot-transfer-link" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://gitee.com/vincent-zyu/koishi-plugin-get-qq-bot-transfer-link" target="_blank">
    <img src="https://img.shields.io/badge/Gitee-C71D23?style=for-the-badge&logo=gitee&logoColor=white" alt="Gitee">
  </a>
  <br>
  <a href="https://forum.koishi.xyz/t/topic/12558" target="_blank">
    <img src="https://img.shields.io/badge/Koishi%20Forum-12558-5546A3?style=flat-square&logo=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Ff%2Ff2%2FKoishi.js_Logo.png&logoColor=white" alt="Forum">
  </a>
  <a href="https://qm.qq.com/q/4vjto4V7Di" target="_blank">
    <img src="https://img.shields.io/badge/QQ群-1085190201-12B7F5?style=flat-square&logo=qq&logoColor=white" alt="QQ群">
  </a>
</p>

<blockquote style="margin: 14px 0; padding: 12px 16px; border-left: 6px solid #ff8a00; border-radius: 8px; background: rgba(255, 138, 0, 0.12); color: inherit; line-height: 1.6; box-shadow: 0 1px 4px rgba(0,0,0,0.06);">
  <b style="color: #ff8a00; font-size: 15px;">🌐 手机 QQ 原生管理页一键 Schema 唤起跳转</b><br>
  快速生成 QQ 官方 Bot 免艾特全量主动发言与机器人管理页跳转链接，支持手机端原生弹窗一键直达与参数重填引导。
</blockquote>

<details style="${detailsStyle}">
<summary style="${summaryStyle}"><b style="color: #ff8a00;">⚠️ 前置条件与权限要求</b></summary>
<div style="${detailsBodyStyle}">
  <div style="margin: 8px 0; padding: 10px 14px; border-radius: 6px; background: rgba(255, 138, 0, 0.08); border-left: 4px solid #ff8a00;">
    <ul style="margin: 4px 0; padding-left: 18px; line-height: 1.7;">
      <li>需配合 <a href="https://github.com/NapNeko/NapCatQQ" target="_blank">NapCat</a>（或其他 OneBot V11 实现）运行 🐱</li>
      <li>需要 <b>QQ 9.2.90 以上版本</b> 才能正常解析并打开客户端 Schema 配置链接 📱</li>
      <li>操作者必须是当前群的<b>群主</b>才拥有官方机器人的配置权限 👑</li>
    </ul>
  </div>
</div>
</details>

<details style="${detailsStyle}">
<summary style="${summaryStyle}"><b style="color: #0ea5e9;">⌨️ 指令说明与参数优先级</b></summary>
<div style="${detailsBodyStyle}">
  <div style="margin: 8px 0; padding: 10px 14px; border-radius: 6px; background: rgba(14, 165, 233, 0.08); border-left: 4px solid #0ea5e9;">
    <h4 style="margin: 4px 0 8px;">1️⃣ napcat-getuser</h4>
    <p style="margin: 4px 0;">通过 NapCat onebot 接口查询指定 QQ 号用户信息（仅 <code>onebot</code> 平台生效）：</p>
    <pre style="margin: 6px 0;"><code>napcat-getuser &lt;userId&gt;</code></pre>

    <h4 style="margin: 12px 0 8px;">2️⃣ qqbot-url</h4>
    <p style="margin: 4px 0;">生成官 Bot 全量主动配置链接，群主用手机 QQ 点击即可唤起原生管理页：</p>
    <pre style="margin: 6px 0;"><code>qqbot-url                                  # 使用配置项兜底
qqbot-url &lt;groupCode&gt;                      # arg 直接传群号
qqbot-url -g &lt;groupCode&gt;                   # option 传群号
qqbot-url -u &lt;botUin&gt; -i &lt;botUid&gt; -g &lt;groupCode&gt;  # 完整显式指定</code></pre>
    <p style="margin: 4px 0;"><b>快捷别名：</b><code>免艾特申请</code>、<code>一键跳转免艾特配置</code>、<code>一键跳转全量主动配置</code></p>
    <p style="margin: 4px 0; font-size: 13px; color: var(--k-text-light, #666);">
      <b>传参优先级：</b><code>指令 arg</code> &gt; <code>--option 选项</code> &gt; <code>配置项兜底值</code> &gt; <code>当前群号</code>
    </p>

    <h4 style="margin: 12px 0 8px;">3️⃣ qqbot-guide</h4>
    <p style="margin: 4px 0;">发送手机 QQ 机器人全量消息与主动发言手动配置指南图文：</p>
    <pre style="margin: 6px 0;"><code>qqbot-guide</code></pre>
    <p style="margin: 4px 0;"><b>快捷别名：</b><code>免艾特手动配置指南</code>、<code>全量主动手动配置指南</code></p>
  </div>
</div>
</details>

<details style="${detailsStyle}">
<summary style="${summaryStyle}"><b style="color: #16a34a;">⚙️ 配置项总览与图片探测机制</b></summary>
<div style="${detailsBodyStyle}">
  <div style="margin: 8px 0; padding: 10px 14px; border-radius: 6px; background: rgba(22, 163, 74, 0.08); border-left: 4px solid #16a34a; overflow-x: auto;">
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="border-bottom: 2px solid var(--k-color-divider, #ccc);">
          <th style="padding: 6px; text-align: left;">配置项</th>
          <th style="padding: 6px; text-align: left;">类型</th>
          <th style="padding: 6px; text-align: left;">默认值</th>
          <th style="padding: 6px; text-align: left;">说明</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid var(--k-color-divider, #eee);">
          <td style="padding: 6px;"><code>useQqMarkdown</code></td>
          <td style="padding: 6px;">boolean</td>
          <td style="padding: 6px;"><code>true</code></td>
          <td style="padding: 6px;">QQ 官方 Bot 平台优先使用 Markdown 富文本下发</td>
        </tr>
        <tr style="border-bottom: 1px solid var(--k-color-divider, #eee);">
          <td style="padding: 6px;"><code>addJumpButton</code></td>
          <td style="padding: 6px;">boolean</td>
          <td style="padding: 6px;"><code>true</code></td>
          <td style="padding: 6px;">消息底部附加 Action Type 1 原生 Schema 跳转按钮</td>
        </tr>
        <tr style="border-bottom: 1px solid var(--k-color-divider, #eee);">
          <td style="padding: 6px;"><code>defaultBotUin</code></td>
          <td style="padding: 6px;">string</td>
          <td style="padding: 6px;"><code>""</code></td>
          <td style="padding: 6px;">默认官 Bot QQ 号</td>
        </tr>
        <tr style="border-bottom: 1px solid var(--k-color-divider, #eee);">
          <td style="padding: 6px;"><code>defaultBotUid</code></td>
          <td style="padding: 6px;">string</td>
          <td style="padding: 6px;"><code>""</code></td>
          <td style="padding: 6px;">默认官 Bot UID</td>
        </tr>
        <tr>
          <td style="padding: 6px;"><code>defaultGroupCode</code></td>
          <td style="padding: 6px;">string</td>
          <td style="padding: 6px;"><code>""</code></td>
          <td style="padding: 6px;">默认群号（留空则自动提取当前会话群号）</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</details>

<details style="${detailsStyle}">
<summary style="${summaryStyle}"><b style="color: #7c3aed;">🎹 按钮 JSON 填写示范</b></summary>
<div style="${detailsBodyStyle}">
  <div style="margin: 8px 0; padding: 10px 14px; border-radius: 6px; background: rgba(124, 58, 237, 0.08); border-left: 4px solid #7c3aed;">
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="border-bottom: 2px solid var(--k-color-divider, #ccc);">
          <th style="padding: 6px; text-align: left;">配置项</th>
          <th style="padding: 6px; text-align: left;">说明</th>
          <th style="padding: 6px; text-align: left;">示范文档</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid var(--k-color-divider, #eee);">
          <td style="padding: 6px;"><code>missingGroupCodeKeyboardJson</code></td>
          <td style="padding: 6px;">缺少群号时的引导按钮配置</td>
          <td style="padding: 6px;">
            <a href="https://github.com/VincentZyuApps/koishi-plugin-get-qq-bot-transfer-link/blob/main/doc/json/missing-group-code-keyboard.md" target="_blank" style="color: #7c3aed; font-weight: bold;">查看 GitHub 示范</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 6px;"><code>qqBotCommandKeyboardJson</code></td>
          <td style="padding: 6px;">两个 qqbot 指令通用的交互键盘</td>
          <td style="padding: 6px;">
            <a href="https://github.com/VincentZyuApps/koishi-plugin-get-qq-bot-transfer-link/blob/main/doc/json/qqbot-command-keyboard.md" target="_blank" style="color: #7c3aed; font-weight: bold;">查看 GitHub 示范</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</details>

<details style="${detailsStyle}">
<summary style="${summaryStyle}"><b style="color: #ec4899;">💬 社区交流与反馈渠道</b></summary>
<div style="${detailsBodyStyle}">
  <div style="margin: 8px 0; padding: 10px 14px; border-radius: 6px; background: rgba(236, 72, 153, 0.08); border-left: 4px solid #ec4899;">
    <p style="margin: 4px 0;">🐛 <b>Bug 反馈 / 💡 建议 / 👨‍💻 交流群：</b></p>
    <p style="margin: 4px 0;">💬 欢迎加入官方交流 QQ 群：<b style="color: #12B7F5;">1085190201</b> 🎉</p>
    <p style="margin: 4px 0;">💡 在群里直接艾特作者 <b>vincentzyu</b>，回复更及时~ ✨</p>
  </div>
</div>
</details>
`
