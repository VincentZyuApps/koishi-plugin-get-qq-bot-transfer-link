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
    <img src="https://img.shields.io/npm/v/koishi-plugin-get-qq-bot-transfer-link?style=flat-square" alt="npm version">
  </a>
  <a href="https://github.com/VincentZyu233/koishi-plugin-get-qq-bot-transfer-link" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://gitee.com/vincent-zyu/koishi-plugin-get-qq-bot-transfer-link" target="_blank">
    <img src="https://img.shields.io/badge/Gitee-C71D23?style=for-the-badge&logo=gitee&logoColor=white" alt="Gitee">
  </a>
  <a href="https://qm.qq.com/q/ZN7fxZ3qCq" target="_blank">
    <img src="https://img.shields.io/badge/QQ群-1085190201-1AAD19?style=flat-square" alt="QQ群">
  </a>
  <a href="https://forum.koishi.xyz/t/topic/12558" target="_blank">
    <img src="https://img.shields.io/badge/Koishi%20Forum-12558-5546A3?style=for-the-badge&logo=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Ff%2Ff3%2FKoishi.js_Logo.png&logoColor=white" alt="Forum">
  </a>
</p>

<hr>

<h2>💬 交流反馈</h2>
<p>🐛 Bug 反馈 / 💡 建议 / 👨‍💻 插件开发交流，欢迎加群：</p>
<p><del>💬 插件使用问题 / 🐛 Bug反馈 / 👨‍💻 插件开发交流，欢迎加入QQ群：<b>259248174</b>   🎉（这个群G了</del></p>
<p>📢 <b>QQ群：<a href="https://qm.qq.com/q/T5ALM9apGx">1085190201</a></b> 🎉</p>
<p>💡 在群里直接艾特我，回复的更快哦~ ✨</p>

<hr>

<h2>⚠️ 前置条件</h2>
<ul>
  <li>需要 NapCat (或其他 OneBot 实现) 🐱</li>
  <li>需要 <b>QQ 9.2.90 以上版本</b> 才能打开配置链接 📱</li>
  <li>需要你是<b>群主</b>才能配置 👑</li>
</ul>

<hr>

<h2>⌨️ 指令说明</h2>

<h3>1️⃣ napcat-getuser</h3>
<p>通过 NapCat onebot 接口查询用户信息。仅在 <code>onebot</code> 平台可用。(建议用Napcat，因为其他的我没测过(</p>
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

<h4>选项列表</h4>
<table>
  <tr><th>选项</th><th>缩写</th><th>说明</th></tr>
  <tr><td><code>--botuin</code></td><td><code>-u</code></td><td>官Bot的QQ号</td></tr>
  <tr><td><code>--botuid</code></td><td><code>-i</code></td><td>官Bot的UID</td></tr>
  <tr><td><code>--groupcode</code></td><td><code>-g</code></td><td>群号</td></tr>
</table>

<h4>参数优先级</h4>
<p><code>指令 arg</code> > <code>--option 传参</code> > <code>配置项兜底值</code> > <code>报错提示</code></p>

<hr>

<h2>⚙️ 配置项</h2>
<table>
  <tr><th>配置项</th><th>类型</th><th>默认值</th><th>说明</th></tr>
  <tr><td><code>useMarkdown</code></td><td>boolean</td><td><code>true</code></td><td>QQ平台使用 Markdown 富文本发送</td></tr>
  <tr><td><code>addJumpButton</code></td><td>boolean</td><td><code>true</code></td><td>消息底部添加跳转按钮</td></tr>
  <tr><td><code>defaultBotUin</code></td><td>string</td><td><code>""</code></td><td>默认官Bot QQ号</td></tr>
  <tr><td><code>defaultBotUid</code></td><td>string</td><td><code>""</code></td><td>默认官Bot UID</td></tr>
  <tr><td><code>defaultGroupCode</code></td><td>string</td><td><code>""</code></td><td>默认群号（兜底到当前群）</td></tr>
  <tr><td><code>showBotInfo</code></td><td>boolean</td><td><code>false</code></td><td>消息中是否显示botUin/botUid/groupCode</td></tr>
  <tr><td><code>showImage</code></td><td>boolean</td><td><code>true</code></td><td>链接上方附带操作提示图片</td></tr>
  <tr><td><code>imageUrl</code></td><td>string</td><td>gitee 直链</td><td>操作提示图片 URL</td></tr>
  <tr><td><code>imageWidth</code></td><td>string</td><td><code>1080px</code></td><td>Markdown 图片宽度</td></tr>
  <tr><td><code>imageHeight</code></td><td>string</td><td><code>888px</code></td><td>Markdown 图片高度</td></tr>
  <tr><td><code>missingGroupCodeKeyboardJson</code></td><td>string</td><td><code>""</code></td><td>缺群号时键盘按钮JSON</td></tr>
</table>

<h3> 缺群号按钮 JSON 示例</h3>

<p><b>示例1 - 快速填充指令</b></p>
<pre><code>{
  "rows": [{
    "buttons": [{
      "id": "cmd_1",
      "render_data": {
        "label": "🔢重新输入群号(点我快速填入指令)",
        "style": 1
      },
      "action": {
        "type": 2,
        "permission": { "type": 2 },
        "data": "qqbot-url -g ",
        "enter": false,
        "reply": false,
        "unsupport_tips": "请更新QQ版本后使用"
      }
    }]
  }]
}</code></pre>

<p><b>示例2 - 跳转网页链接</b></p>
<pre><code>{
  "rows": [{
    "buttons": [{
      "id": "help_1",
      "render_data": {
        "label": "❓查看帮助(url编码规则)",
        "style": 1
      },
      "action": {
        "type": 0,
        "permission": { "type": 2 },
        "data": "https://forum.koishi.xyz/t/topic/12558",
        "unsupport_tips": "请更新QQ版本后使用"
      }
    }]
  }]
}</code></pre>

<p><b>示例3 - 两按钮一起</b></p>
<pre><code>{
  "rows": [{
    "buttons": [
      {
        "id": "cmd_2",
        "render_data": {
          "label": "🔢重新输入群号",
          "style": 1
        },
        "action": {
          "type": 2,
          "permission": { "type": 2 },
          "data": "qqbot-url -g ",
          "enter": false,
          "reply": false,
          "unsupport_tips": "请更新QQ版本后使用"
        }
      },
      {
        "id": "help_2",
        "render_data": {
          "label": "❓查看帮助",
          "style": 0
        },
        "action": {
          "type": 0,
          "permission": { "type": 2 },
          "data": "https://forum.koishi.xyz/t/topic/12558",
          "unsupport_tips": "请更新QQ版本后使用"
        }
      }
    ]
  }]
}</code></pre>

<p><b>示例4 - 自定义操作按钮（不带 id）</b></p>
<pre><code>{
  "rows": [{
    "buttons": [
      {
        "render_data": {
          "label": "📝再试一次",
          "style": 1
        },
        "action": {
          "type": 2,
          "permission": { "type": 2 },
          "data": "/免艾特申请",
          "enter": true
        }
      },
      {
        "render_data": {
          "label": "🎈玩玩其他的",
          "style": 1
        },
        "action": {
          "type": 2,
          "permission": { "type": 2 },
          "data": "/help",
          "enter": true
        }
      }
    ]
  }]
}</code></pre>

`
