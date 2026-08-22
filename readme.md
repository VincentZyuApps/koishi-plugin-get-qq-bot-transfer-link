![koishi-plugin-get-qq-bot-transfer-link](https://socialify.git.ci/VincentZyuApps/koishi-plugin-get-qq-bot-transfer-link/image?custom_description=%F0%9F%A4%96%F0%9F%94%97%E2%9A%99%EF%B8%8F+%E5%88%A9%E7%94%A8NapCat%E8%8E%B7%E5%8F%96%E5%AE%98bot%E7%9A%84uid%EF%BC%8C%E7%84%B6%E5%90%8E%E8%8E%B7%E5%8F%96%E6%9C%AC%E7%BE%A4%E7%9A%84+%E5%BC%80%E6%94%BE%E5%AE%98bot%E7%9A%84%E5%85%A8%E9%87%8F%E5%92%8C%E4%B8%BB%E5%8A%A8%E7%9A%84%E9%85%8D%E7%BD%AE%E9%93%BE%E6%8E%A5%EF%BC%8C%E7%84%B6%E5%90%8E%E7%BE%A4%E4%B8%BB%E7%94%A8%E6%89%8B%E6%9C%BAqq%E6%89%93%E5%BC%80%E5%B0%B1%E5%8F%AF%E4%BB%A5%E9%85%8D%E7%BD%AE%E4%BA%86&description=1&forks=1&issues=1&language=1&logo=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Ff%2Ff3%2FKoishi.js_Logo.png%3F_%3D20230331182243&name=1&owner=1&pulls=1&stargazers=1&theme=Auto)

# koishi-plugin-get-qq-bot-transfer-link

利用 [NapCat](https://github.com/NapNeko/NapCatQQ) 获取官bot的uid，然后获取本群的 开放官bot的全量和主动的配置链接，然后群主用手机qq打开就可以配置了

[![npm](https://img.shields.io/npm/v/koishi-plugin-get-qq-bot-transfer-link?style=flat-square&logo=npm)](https://www.npmjs.com/package/koishi-plugin-get-qq-bot-transfer-link)
[![npm-download](https://img.shields.io/npm/dm/koishi-plugin-get-qq-bot-transfer-link?style=flat-square&logo=npm)](https://npm-stat.com/charts.html?package=koishi-plugin-get-qq-bot-transfer-link)

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/VincentZyu233/koishi-plugin-get-qq-bot-transfer-link)
[![Gitee](https://img.shields.io/badge/Gitee-C71D23?style=for-the-badge&logo=gitee&logoColor=white)](https://gitee.com/vincent-zyu/koishi-plugin-get-qq-bot-transfer-link)

[![Koishi Forum](https://img.shields.io/badge/forum.koishi.xyz_topic_12558-5546A3?style=for-the-badge&logo=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Ff%2Ff3%2FKoishi.js_Logo.png&logoColor=white)](https://forum.koishi.xyz/t/topic/12558)

[![QQ群](https://img.shields.io/badge/QQ群-1085190201-12B7F5?style=flat-square&logo=qq&logoColor=white)](https://qm.qq.com/q/4vjto4V7Di)


<p><del>💬 插件使用问题 / 🐛 Bug反馈 / 👨‍💻 插件开发交流，欢迎加入QQ群：<b>259248174</b>   🎉（这个群G了</del> </p> 
<p>💬 插件使用问题 / 🐛 Bug反馈 / 👨‍💻 插件开发交流，欢迎加入QQ群：<b>1085190201</b> 🎉</p>
<p>💡 在群里直接艾特我，回复的更快哦~ ✨</p>

---

## 📝 Markdown 发送说明

本插件支持在 QQ 官方平台以 **Markdown + 按钮** 格式发送消息，自动检测 adapter 类型选择发送路径。

### 两种场景

| 场景 | 发送内容 |
|---|---|
| **传了群号** | Markdown 富文本（botUin/botUid/groupCode 信息 + 操作提示图片）+ 「打开配置链接」跳转按钮 |
| **缺群号** | 根据 `missingGroupCodeSendMode` 配置，支持三种模式：`text`（纯文本）/ `markdown`（纯 Markdown）/ `markdown_button`（Markdown + 自定义按钮） |

### Adapter 兼容

- **Crack adapter**（`koishi-plugin-adapter-qq-crack`）— 走 `h('qq:rawmarkdown')` 元素层，完整支持自定义 Markdown 内容
- **官方 adapter**（`@koishijs/plugin-adapter-qq`）— 走 internal API + 手动被动回复上下文（msg_id/msg_seq），也支持 Markdown + 按钮

---

## ⚙️ 配置项

| 配置项 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `useMarkdown` | boolean | `true` | QQ平台使用 Markdown 富文本发送 |
| `addJumpButton` | boolean | `true` | 两个 `qqbot-*` 指令底部添加共享键盘 |
| `qqBotCommandKeyboardJson` | string | 见配置页 | 两个 `qqbot-*` 指令共用的键盘 JSON 模板 |
| `defaultBotUin` | string | `""` | 默认官Bot QQ号（option 兜底） |
| `defaultBotUid` | string | `""` | 默认官Bot UID（option 兜底） |
| `defaultGroupCode` | string | `""` | 默认群号（option 兜底，再兜底到当前群） |
| `requireGroupCode` | boolean | `true` | 强制要求通过 arg 或 `--groupcode` 传入群号 |
| `showBotInfo` | boolean | `true` | 两个 `qqbot-*` 指令中显示 botUin / botUid / groupCode |
| `qqMarkdownBotInfoStyle` | `text`/`bold`/`inline`/`table` | `bold` | Bot 信息在 Markdown 中的展示样式 |
| `qqTransferLinkGuideText` | string | 见配置页 | 迁移链接说明文字 |
| `qqTransferLinkGuideShowImage` | boolean | `true` | 迁移链接消息附带操作提示图片 |
| `qqTransferLinkGuideImageUrl` | string | jsDelivr 直链 | 迁移链接操作提示图片 URL |
| `qqTransferLinkGuideImageWidth` | string | `1080px` | 迁移链接 Markdown 图片宽度 |
| `qqTransferLinkGuideImageHeight` | string | `888px` | 迁移链接 Markdown 图片高度 |
| `qqUiSettingsGuideText` | string | 见配置页 | 手机QQ手动配置指南说明文字 |
| `qqUiSettingsGuideShowImage` | boolean | `true` | 手动配置指南附带图片 |
| `qqUiSettingsGuideImageUrl` | string | jsDelivr 直链 | 手机QQ手动配置指南图片 URL |
| `qqUiSettingsGuideImageWidth` | string | `1871px` | 手动配置指南 Markdown 图片宽度 |
| `qqUiSettingsGuideImageHeight` | string | `1044px` | 手动配置指南 Markdown 图片高度 |
| `missingGroupCodeSendMode` | `text`/`markdown`/`markdown_button` | `markdown` | 缺群号时 QQ 平台的发送模式 |
| `missingGroupCodeMessage` | string | 见配置页 | 缺群号时的纯文本提示 |
| `missingGroupCodeMarkdownContent` | string | 见配置页 | 缺群号时的 Markdown 内容 |
| `missingGroupCodeKeyboardJson` | string | 见配置页 | 缺群号时的自定义按钮 JSON |
| `verboseConsoleLog` | boolean | `false` | 控制台输出每次发送的 payload（调试用） |

## ⌨️ 指令

### `napcat-getuser [userId]`
通过 [napcat onebot](https://github.com/NapNeko/NapCatQQ) 接口查询用户信息。仅在 `onebot` 平台可用。

### `qqbot-url`
生成官Bot全量主动配置链接。

**别名：** `免艾特申请`、`一键跳转免艾特配置`、`一键跳转全量主动配置`

**选项：**
| 选项 | 缩写 | 说明 |
|---|---|---|
| `--botuin` | `-u` | 官Bot的QQ号 |
| `--botuid` | `-i` | 官Bot的UID |
| `--groupcode` | `-g` | 群号 |

**参数优先级：** `指令 arg` > `--option 传参` > `配置项兜底值` > `当前会话群号` > `报错提示`

### `qqbot-guide`
发送手机QQ机器人全量消息与主动发言手动配置指南。

**别名：** `免艾特手动配置指南`、`全量主动手动配置指南`

QQ 平台开启 `useMarkdown` 或 `addJumpButton` 时发送 Markdown，顺序为 Bot 信息、引用说明、可选图片、共享键盘。Guide 不接收身份参数，Bot 信息读取默认配置，群号可继续回退到当前会话，缺失字段显示 `-`。

## 🎹 两个 qqbot 指令共用的键盘模板

`qqBotCommandKeyboardJson` 的默认值由 TypeScript 原生对象生成，支持 `${url}`、`${jumpActionType}`、`${jumpActionData}`、`${jumpEnter}` 占位符。

- `qqbot-url`：第一行按钮直接打开本次生成的迁移链接。
- `qqbot-guide`：第一行按钮填入 `/一键跳转免艾特配置 【在这里填入群号】`，等待用户修改群号；第二行执行 `/qqbot-guide`。
- 模板留空或 JSON 无效时不发送键盘；`qqbot-url` 会回退为在 Markdown 正文中显示链接。

## 🎹 按钮 JSON 填写示范

- [`missingGroupCodeKeyboardJson`：缺群号按钮配置](https://gitee.com/vincent-zyu/koishi-plugin-get-qq-bot-transfer-link/blob/main/doc/json/missing-group-code-keyboard.md)
- [`qqBotCommandKeyboardJson`：两个 qqbot 指令共用按钮配置](https://gitee.com/vincent-zyu/koishi-plugin-get-qq-bot-transfer-link/blob/main/doc/json/qqbot-command-keyboard.md)

## ✨ 效果

### 1️⃣ napcat-getuser
> ↓ 下方图片: 使用 `napcat-getuser <官Bot QQ号>` 查询官Bot信息，并从返回 JSON 中取得 `uid` 与 `uin`。

![0.napcat-getuser.png](doc/images/preview/0.napcat-getuser.png)

### 2️⃣ qqbot-url
> ↓ 下方图片: 手机QQ打开迁移链接后，在授权页面开启“获取群内全部消息”和“机器人主动在群聊内发言”，然后点击“同意授权”。

<div style="display: inline-block; border: 3px solid #12B7F5; border-radius: 8px; padding: 8px;">
  <img src="doc/images/qqbot-url-transfer-link.png" alt="qqbot-url 迁移链接操作提示" style="display: block; max-width: 100%; border-radius: 4px;">
</div>

> ↓ 下方图片: `qqbot-url` 的帮助、缺少群号提示、传入群号后的链接消息，以及 Markdown 按钮发送效果。

![1.qqbot-url.png](doc/images/preview/1.qqbot-url.png)

> ↓ 下方图片: 手机QQ弹出的机器人群聊权限授权窗口，确认开启两个权限后点击“同意授权”。

![2.qqbot-url.png](doc/images/preview/2.qqbot-url.png)

> ↓ 下方图片: 手机QQ权限页中“获取群内全部消息”和“机器人主动在群聊内发言”的具体设置位置。

![3.qqbot-url.png](doc/images/preview/3.qqbot-url.png)

> ↓ 下方图片: 权限开启后，机器人可以接收未被艾特的群消息的实际效果。

![4.qqbot-url.png](doc/images/preview/4.qqbot-url.png)

### 3️⃣ qqbot-guide
> ↓ 下方图片: 群主在手机QQ群成员列表中找到机器人、进入资料页设置，并开启全量消息与主动发言的三步操作图。

<div style="display: inline-block; border: 3px solid #12B7F5; border-radius: 8px; padding: 8px;">
  <img src="doc/images/qqbot-guide-ui-settings.png" alt="qqbot-guide 手机QQ UI 手动配置指南" style="display: block; max-width: 100%; border-radius: 4px;">
</div>

> ↓ 下方图片: `qqbot-guide` 在 QQ 中发送的手动配置指南，包含 Bot 信息、内嵌步骤图和底部快捷按钮。

![5.qqbot-guide.png](doc/images/preview/5.qqbot-guide.png)
