import { readFileSync } from 'fs'
import { resolve } from 'path'

const pkg = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8'))

export const usage = `
<h1>🤖 获取官Bot配置链接</h1>
<h2>📦 v${pkg.version}</h2>

<hr>

<h2>📖 简介</h2>
<p>${pkg.description}</p>

<hr>

<h2>🔗 相关链接</h2>
<p>
  <a href="https://www.npmjs.com/package/koishi-plugin-get-qq-bot-transfer-link" target="_blank">
    <img src="https://img.shields.io/npm/v/koishi-plugin-get-qq-bot-transfer-link?style=flat-square&logo=npm" alt="npm version">
  </a>
  <a href="https://npm-stat.com/charts.html?package=koishi-plugin-get-qq-bot-transfer-link" target="_blank">
    <img src="https://img.shields.io/npm/dm/koishi-plugin-get-qq-bot-transfer-link?style=flat-square&logo=npm" alt="npm downloads">
  </a>
  <br>
  <a href="https://github.com/VincentZyu233/koishi-plugin-get-qq-bot-transfer-link" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://gitee.com/vincent-zyu/koishi-plugin-get-qq-bot-transfer-link" target="_blank">
    <img src="https://img.shields.io/badge/Gitee-C71D23?style=for-the-badge&logo=gitee&logoColor=white" alt="Gitee">
  </a>
  <br>
  <a href="https://forum.koishi.xyz/t/topic/12558" target="_blank">
    <img src="https://img.shields.io/badge/Koishi%20Forum-12558-5546A3?style=for-the-badge&logo=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Ff%2Ff3%2FKoishi.js_Logo.png&logoColor=white" alt="Forum">
  </a>
  <br>
  <a href="https://qm.qq.com/q/4vjto4V7Di" target="_blank">
    <img src="https://img.shields.io/badge/QQ群-1085190201-12B7F5?style=flat-square&logo=qq&logoColor=white" alt="QQ群">
  </a>
  <br>
</p>

<hr>

<h2>💬 交流反馈</h2>
<p>🐛 Bug 反馈 / 💡 建议 / 👨‍💻 插件开发交流，欢迎加群：</p>
<p><del>💬 插件使用问题 / 🐛 Bug反馈 / 👨‍💻 插件开发交流，欢迎加入QQ群：<b>259248174</b>   🎉（这个群G了</del></p>
<p>💬 插件使用问题 / 🐛 Bug反馈 / 👨‍💻 插件开发交流，欢迎加入QQ群：<b>1085190201</b> 🎉</p>
<p>💡 在群里直接艾特我，回复的更快哦~ ✨</p>

<hr>

<h2>⚠️ 前置条件</h2>
<ul>
  <li>需要 <a href="https://github.com/NapNeko/NapCatQQ" target="_blank">NapCat</a> (或其他 OneBot V11实现，但是我只测试过<a href="https://github.com/NapNeko/NapCatQQ" target="_blank">Napcat</a>喵) 🐱</li>
  <li>需要 <b>QQ 9.2.90 以上版本</b> 才能打开配置链接 📱</li>
  <li>需要你是<b>群主</b>才能配置 👑</li>
</ul>

<hr>

<h2>⌨️ 指令说明</h2>

<h3>1️⃣ napcat-getuser</h3>
<p>通过 <a href="https://github.com/NapNeko/NapCatQQ" target="_blank">NapCat</a> onebot 接口查询用户信息。仅在 <code>onebot</code> 平台可用。(建议用<a href="https://github.com/NapNeko/NapCatQQ" target="_blank">Napcat</a>，因为其他的我没测过(</p>
<pre><code>napcat-getuser &lt;userId&gt;</code></pre>

<h3>2️⃣ qqbot-url</h3>
<p>生成官Bot全量主动配置链接。群主用手机QQ打开链接即可配置。</p>
<pre><code>
qqbot-url                                  # 使用配置项兜底
</code></pre>
<pre><code>
qqbot-url &lt;groupCode&gt;                      # arg 传群号
</code></pre>
<pre><code>
qqbot-url -g &lt;groupCode&gt;                   # option 传群号
</code></pre>
<pre><code>
qqbot-url -u &lt;botUin&gt; -i &lt;botUid&gt; -g &lt;groupCode&gt;  # 全部指定
</code></pre>

<p><b>别名：</b><code>免艾特申请</code>、<code>一键跳转免艾特配置</code>、<code>一键跳转全量主动配置</code></p>

<h4>选项列表</h4>
<table>
  <tr><th>选项</th><th>缩写</th><th>说明</th></tr>
  <tr><td><code>--botuin</code></td><td><code>-u</code></td><td>官Bot的QQ号</td></tr>
  <tr><td><code>--botuid</code></td><td><code>-i</code></td><td>官Bot的UID</td></tr>
  <tr><td><code>--groupcode</code></td><td><code>-g</code></td><td>群号</td></tr>
</table>

<h4>参数优先级</h4>
<p><code>指令 arg</code> > <code>--option 传参</code> > <code>配置项兜底值</code> > <code>报错提示</code></p>

<h3>3️⃣ qqbot-guide</h3>
<p>发送手机QQ机器人全量消息与主动发言手动配置指南。</p>
<pre><code>qqbot-guide</code></pre>
<p><b>别名：</b><code>免艾特手动配置指南</code>、<code>全量主动手动配置指南</code></p>
<p>QQ 平台开启 <code>useQqMarkdown</code> 或 <code>addJumpButton</code> 时发送 Markdown，内容顺序为 Bot 信息、引用说明、可选图片、共享键盘。</p>
<p>Guide 不接收身份参数；Bot 信息读取默认配置，群号可回退到当前会话，缺失字段显示 <code>-</code>。</p>

<hr>

<h2>⚙️ 配置项</h2>
<table>
  <tr><th>配置项</th><th>类型</th><th>默认值</th><th>说明</th></tr>
  <tr><td><code>useQqMarkdown</code></td><td>boolean</td><td><code>true</code></td><td>QQ平台使用 Markdown 富文本发送</td></tr>
  <tr><td><code>addJumpButton</code></td><td>boolean</td><td><code>true</code></td><td>消息底部添加跳转按钮</td></tr>
  <tr><td><code>qqBotCommandKeyboardJson</code></td><td>string</td><td>见配置页</td><td>两个 qqbot 指令共用的键盘 JSON 模板</td></tr>
  <tr><td><code>defaultBotUin</code></td><td>string</td><td><code>""</code></td><td>默认官Bot QQ号</td></tr>
  <tr><td><code>defaultBotUid</code></td><td>string</td><td><code>""</code></td><td>默认官Bot UID</td></tr>
  <tr><td><code>defaultGroupCode</code></td><td>string</td><td><code>""</code></td><td>默认群号（兜底到当前群）</td></tr>
  <tr><td><code>showBotInfo</code></td><td>boolean</td><td><code>true</code></td><td>两个 qqbot 指令中是否显示 botUin/botUid/groupCode</td></tr>
  <tr><td><code>qqTransferLinkGuideText</code></td><td>string</td><td>见配置页</td><td>迁移链接说明文字</td></tr>
  <tr><td><code>qqTransferLinkGuideShowImage</code></td><td>boolean</td><td><code>true</code></td><td>迁移链接消息附带操作提示图片</td></tr>
  <tr><td><code>qqTransferLinkGuideImageUrl</code></td><td>string</td><td>Gitee Raw 直链</td><td>迁移链接操作提示图片 URL</td></tr>
  <tr><td><code>qqTransferLinkGuideImageWidth</code></td><td>string</td><td><code>1080px</code></td><td>迁移链接 Markdown 图片宽度</td></tr>
  <tr><td><code>qqTransferLinkGuideImageHeight</code></td><td>string</td><td><code>888px</code></td><td>迁移链接 Markdown 图片高度</td></tr>
  <tr><td><code>qqTransferLinkGuideShowUrl</code></td><td>boolean</td><td><code>true</code></td><td>在 QQ Markdown、QQ 纯文本和非 QQ 平台消息末尾附带迁移 URL</td></tr>
  <tr><td><code>qqUiSettingsGuideText</code></td><td>string</td><td>见配置页</td><td>手机QQ手动配置指南说明文字</td></tr>
  <tr><td><code>qqUiSettingsGuideShowImage</code></td><td>boolean</td><td><code>true</code></td><td>手动配置指南附带图片</td></tr>
  <tr><td><code>qqUiSettingsGuideImageUrl</code></td><td>string</td><td>Gitee Raw 直链</td><td>手机QQ手动配置指南图片 URL</td></tr>
  <tr><td><code>qqUiSettingsGuideImageWidth</code></td><td>string</td><td><code>1871px</code></td><td>指南 Markdown 图片宽度</td></tr>
  <tr><td><code>qqUiSettingsGuideImageHeight</code></td><td>string</td><td><code>1044px</code></td><td>指南 Markdown 图片高度</td></tr>
  <tr><td><code>missingGroupCodeKeyboardJson</code></td><td>string</td><td>见配置页</td><td>缺群号时键盘按钮JSON</td></tr>
</table>

<h3>🎹 两个 qqbot 指令共用的键盘模板</h3>
<p><code>qqBotCommandKeyboardJson</code> 支持 <code>\${url}</code>、<code>\${jumpActionType}</code>、<code>\${jumpActionData}</code>、<code>\${jumpEnter}</code> 占位符。</p>
<ul>
  <li><code>qqbot-url</code> 的第一行按钮会直接打开本次生成的迁移链接。</li>
  <li><code>qqbot-guide</code> 的第一行按钮会填入待修改群号的跳转指令，第二行执行 <code>/qqbot-guide</code>。</li>
  <li>模板留空或 JSON 无效时不发送键盘，URL 指令会在 Markdown 正文中显示链接。</li>
</ul>

<h3>🎹 按钮 JSON 填写示范</h3>
<ul>
  <li><a href="https://gitee.com/vincent-zyu/koishi-plugin-get-qq-bot-transfer-link/blob/main/doc/json/missing-group-code-keyboard.md" target="_blank"><code>missingGroupCodeKeyboardJson</code>：缺群号按钮配置</a></li>
  <li><a href="https://gitee.com/vincent-zyu/koishi-plugin-get-qq-bot-transfer-link/blob/main/doc/json/qqbot-command-keyboard.md" target="_blank"><code>qqBotCommandKeyboardJson</code>：两个 qqbot 指令共用按钮配置</a></li>
</ul>

`
