import { Schema } from 'koishi'
import {
  DEFAULT_MISSING_GROUP_CODE_KEYBOARD,
  DEFAULT_QQ_BOT_COMMAND_KEYBOARD,
  stringifyCompact,
} from './qq'

/**
 * 📋 插件配置项接口
 */
export interface Config {
  // ==== 📝 基础发送配置 ====
  /** 📝 是否在 QQ 官方平台使用 Markdown 格式发送消息 */
  useQqMarkdown: boolean
  /** 🔗 是否在消息末尾添加一个跳转链接按钮 */
  addJumpButton: boolean
  /** 🎹 两个 qqbot 指令共用的 QQ Markdown keyboard JSON */
  qqBotCommandKeyboardJson: string

  // ==== 🧩 默认参数配置 ====
  /** 🆔 官Bot 的默认 botUin（QQ号），作为参数兜底值 */
  defaultBotUin: string
  /** 🔑 官Bot 的默认 botUid，作为参数兜底值 */
  defaultBotUid: string
  /** 👥 默认群号 groupCode，作为参数兜底值 */
  defaultGroupCode: string
  /** 🔒 强制要求传入群号（arg 或 --groupcode），忽略配置项 fallback */
  requireGroupCode: boolean

  // ==== 🎨 配置链接消息样式 ====
  /** 📋 是否在消息中显示 uin / uid / groupCode */
  showBotInfo: boolean
  /** 🎨 QQ Markdown 中 bot 信息的显示样式 */
  qqMarkdownBotInfoStyle: 'text' | 'bold' | 'inline' | 'table'

  // ==== ❌ 缺群号提示配置 ====
  /** ❌ 缺群号时的报错提示文本 */
  missingGroupCodeMessage: string
  /** 🧭 QQ 平台缺群号时的发送模式 */
  missingGroupCodeSendMode: 'text' | 'markdown' | 'markdown_button'
  /** 📝 缺群号时 QQ Markdown 消息的 markdown content */
  missingGroupCodeMarkdownContent: string
  /** 🎹 缺群号时 QQ Markdown 消息的 keyboard JSON（为空则不发按钮） */
  missingGroupCodeKeyboardJson: string

  // ==== 🔗 手机 QQ 转换链接的图片与说明配置 ====
  /** 📝 迁移链接提示文案 */
  qqTransferLinkGuideText: string
  /** 🖼️ 是否在迁移链接消息中附带操作提示图片 */
  qqTransferLinkGuideShowImage: boolean
  /** 🖼️ 迁移链接操作提示图片的 URL */
  qqTransferLinkGuideImageUrl: string
  /** 📐 迁移链接 Markdown 图片宽度（含 px 单位） */
  qqTransferLinkGuideImageWidth: string
  /** 📐 迁移链接 Markdown 图片高度（含 px 单位） */
  qqTransferLinkGuideImageHeight: string

  // ==== 📱 手机 QQ UI 手动配置的图片与说明配置 ====
  /** 📝 手机 QQ 手动配置指南说明文字 */
  qqUiSettingsGuideText: string
  /** 🖼️ 是否显示手机 QQ 手动配置指南图片 */
  qqUiSettingsGuideShowImage: boolean
  /** 🖼️ 手机 QQ 手动配置指南图片 URL */
  qqUiSettingsGuideImageUrl: string
  /** 📐 手机 QQ 手动配置指南 Markdown 图片宽度 */
  qqUiSettingsGuideImageWidth: string
  /** 📐 手机 QQ 手动配置指南 Markdown 图片高度 */
  qqUiSettingsGuideImageHeight: string

  // ==== 🐛 调试配置 ====
  /** 🐛 是否在控制台输出发送 payload */
  verboseConsoleLog: boolean
}

export const Config: Schema<Config> = Schema.intersect([
  // ==== 🧩 默认参数配置 ====
  Schema.object({
  /**
   * 🆔 defaultBotUin — 默认官Bot QQ号
   * 当指令未传 --botuin 时使用此值。
   * 留空且未传参时会报错 ⚠️
   */
  defaultBotUin: Schema.string()
    .default('')
    .description('🆔 默认官Bot的QQ号（botUin），未传 --botuin 时兜底使用'),

  /**
   * 🔑 defaultBotUid — 默认官Bot UID
   * 当指令未传 --botuid 时使用此值。
   * 留空且未传参时会报错 ⚠️
   */
  defaultBotUid: Schema.string()
    .default('')
    .description('🔑 默认官Bot的UID（botUid），未传 --botuid 时兜底使用 <br/>  <i> <b>建议实践</b>: 用<a href="https://github.com/NapNeko/NapCatQQ" target="_blank">Napcat</a>获取一次官bot的uid，然后就填写在这里，一劳永逸  </i>'),

  /**
   * 👥 defaultGroupCode — 默认群号
   * 当指令未传 --groupcode 时使用此值。
   * 留空则使用当前会话群号兜底。
   */
  defaultGroupCode: Schema.string()
    .default('')
    .description('👥 默认群号（groupCode），未传 --groupcode 时兜底使用'),

  /**
   * 🔒 requireGroupCode — 强制要求传入群号
   * - true  → 必须通过 arg 或 --groupcode 传入群号，否则报错
   * - false → 允许 fallback 到配置项或当前会话群号
   */
  requireGroupCode: Schema.boolean()
    .default(true)
    .description('🔒 强制要求传入群号（arg 或 --groupcode），忽略配置项 fallback。提示：可用 onebot 的 inspect 指令获取群号'),
  }).description('==== 🧩 默认参数配置 ===='),

  // ==== 🎨 配置链接消息样式 ====
  Schema.object({
  /**
   * 📋 showBotInfo — 显示 Uin/Uid/GroupCode 信息
   * - true  → 在返回消息中附加上 uin / uid / groupCode 信息 📊
   * - false → 不显示，仅输出链接 🔗
   */
  showBotInfo: Schema.boolean()
    .default(true)
    .description('📋 在返回消息中显示当前使用的 botUin / botUid / groupCode 信息'),

  /**
   * 🎨 qqMarkdownBotInfoStyle — QQ Markdown Bot 信息样式
   * 控制 showBotInfo 为 true 时信息的展示格式。
   */
  qqMarkdownBotInfoStyle: Schema.union([
    Schema.const('text').description('🆔 botUin：${botUin}\n🔑 botUid：${botUid}\n👥 groupCode：${groupCode}'),
    Schema.const('bold').description('**🆔 botUin**：${botUin}\n**🔑 botUid**：${botUid}\n**👥 groupCode**：${groupCode}'),
    Schema.const('inline').description('🆔 ${botUin}  🔑 ${botUid}  👥 ${groupCode}'),
    Schema.const('table').description('| key | value |\n|---|---|\n| 🆔 botUin | ${botUin} |\n| 🔑 botUid | ${botUid} |\n| 👥 groupCode | ${groupCode} |'),
  ])
    .role('radio')
    .default('bold')
    .description('🎨 QQ Markdown 中 Bot 信息的显示样式（text / bold / inline / table）'),
  }).description('==== 🎨 配置链接消息样式 ===='),

  // ==== ❌ 缺群号提示配置 ====
  Schema.object({
  /**
   * 🧭 missingGroupCodeSendMode — 缺群号时 QQ 平台发送模式
   * - text            → 纯文本
   * - markdown        → 纯 Markdown
   * - markdown_button → Markdown + 按钮
   */
  missingGroupCodeSendMode: Schema.union([
    Schema.const('text').description('📄 纯文本'),
    Schema.const('markdown').description('📝 纯 Markdown'),
    Schema.const('markdown_button').description('🎹 Markdown + 按钮'),
  ])
    .role('radio')
    .default('markdown_button')
    .description('🧭 QQ 平台缺群号时发送的消息类型（纯文本 / 纯 Markdown / Markdown + 按钮）'),

  /**
   * ❌ missingGroupCodeMessage — 缺群号报错提示
   * 当 requireGroupCode 为 true 且未传入群号时返回此提示。
   * 前面会自动拼接 h.quote(session?.messageId)。
   */
  missingGroupCodeMessage: Schema.string()
    .default('❌ 请在指令后面加上群号啦~！ \n❗需要QQ 9.2.90.35975以上 \n❗需要你是群主 \n ⚠️可用 arg 直接传入，或使用 --groupcode/-g 选项\n')
    .role('textarea', { rows: [2, 5] })
    .description('❌ 缺群号时返回的报错提示（前面会自动拼接 h.quote）'),

  /**
   * 📝 missingGroupCodeMarkdownContent — 缺群号 QQ Markdown 内容
   * 在 QQ 平台缺群号时作为 markdown.content 发送。
   */
  missingGroupCodeMarkdownContent: Schema.string()
    .default('## ❌ 缺少群号\n\n请在指令后面加上群号啦~！\n\n❗需要QQ 9.2.90.35975以上\n❗需要你是群主\n\n⚠️可用 arg 直接传入，或使用 `--groupcode/-g` 选项')
    .role('textarea', { rows: [4, 8] })
    .description('📝 缺群号时 QQ Markdown 消息的 markdown content（仅在 QQ 平台且配置了按钮 JSON 时生效）'),

  /**
   * 🎹 missingGroupCodeKeyboardJson — 缺群号按钮 JSON
   * 填入 keyboard content 的 JSON（rows 数组），为空则不发按钮，降级为纯文本。
   */
  missingGroupCodeKeyboardJson: Schema.string()
    .default(stringifyCompact(DEFAULT_MISSING_GROUP_CODE_KEYBOARD))
    .role('textarea', { rows: [5, 20] })
    .description('🎹 缺群号时 QQ Markdown 消息的 keyboard JSON（填入 rows 数组，为空则不发按钮降级为纯文本）。<br/><i><a href="https://gitee.com/vincent-zyu/koishi-plugin-get-qq-bot-transfer-link/blob/main/doc/json/missing-group-code-keyboard.md" target="_blank">查看 Gitee 填写示范</a></i>'),
  }).description('==== ❌ 缺群号提示配置 ===='),

  // ==== 📝 基础发送配置 ====
  Schema.object({
  /**
   * 📝 useQqMarkdown — QQ Markdown 开关
   * - true  → 发送 Markdown 富文本消息（支持链接高亮、排版更美观）✨
   * - false → 发送纯文本消息（最简兼容模式）📄
   * 💡 非 QQ 官方平台时自动降级为纯文本，不受此配置影响。
   */
  useQqMarkdown: Schema.boolean()
    .default(true)
    .description('📝 在QQ官方平台使用Markdown按钮格式发送配置链接（而非贼长的纯文本链接）✨'),

  /**
   * 🔗 addJumpButton — 跳转按钮开关
   * - true  → 两个 qqbot 指令的消息底部挂载共享键盘 🚀
   * - false → 不添加按钮，仅展示消息内容 📄
   * 💡 开启后自动启用 Markdown 模式（按钮依赖 msg_type: 2）。
   */
  addJumpButton: Schema.boolean()
    .default(true)
    .description('🔗 在两个 qqbot 指令的 QQ Markdown 消息末尾添加共享的两行按钮 🚀'),

  /**
   * 🎹 qqBotCommandKeyboardJson — qqbot 指令共享按钮 JSON 模板
   * 同时用于 qqbot-url 与 qqbot-guide，支持动态跳转占位符。
   * 留空时不发送按钮，JSON 无法解析时同样降级为无按钮。
   */
  qqBotCommandKeyboardJson: Schema.string()
    .default(stringifyCompact(DEFAULT_QQ_BOT_COMMAND_KEYBOARD))
    .role('textarea', { rows: [8, 20] })
    .description('🎹 qqbot-url 与 qqbot-guide 共用的 keyboard JSON。<br/><i>支持变量：<code>${url}</code>、<code>${jumpActionType}</code>、<code>${jumpActionData}</code>、<code>${jumpEnter}</code>；<a href="https://gitee.com/vincent-zyu/koishi-plugin-get-qq-bot-transfer-link/blob/main/doc/json/qqbot-command-keyboard.md" target="_blank">查看 Gitee 填写示范</a></i>'),
  }).description('==== 📝 基础发送配置 ===='),

  // ==== 🔗 手机 QQ 转换链接的图片与说明配置 ====
  Schema.object({
  /**
   * 📝 qqTransferLinkGuideText — 迁移链接引导文案
   * 显示在迁移链接消息的图片和链接或按钮上方。
   */
  qqTransferLinkGuideText: Schema.string()
    .default('这个链接只有群主才能进行设置。手机QQ 9.2.90及以上版本可用。最新版本手机QQ也可以直接去手机qq的ui中设置。可以使用指令 /免艾特手动配置指南 获取帮助')
    .role('textarea', { rows: [2, 5] })
    .description('📱 迁移链接引导文案，显示在图片和链接或按钮上方'),

  /**
   * 🖼️ qqTransferLinkGuideShowImage — 迁移链接操作提示图片开关
   * - true  → 在迁移链接消息中附带操作提示图片
   * - false → 不发送操作提示图片
   */
  qqTransferLinkGuideShowImage: Schema.boolean()
    .default(true)
    .description('🖼️ 在迁移链接消息中附带操作提示图片'),

  /**
   * 🖼️ qqTransferLinkGuideImageUrl — 迁移链接操作提示图片 URL
   * 当 qqTransferLinkGuideShowImage 为 true 时使用此 URL 显示图片。
   */
  qqTransferLinkGuideImageUrl: Schema.string()
    .default('https://gitee.com/vincent-zyu/koishi-plugin-get-qq-bot-transfer-link/raw/main/doc/images/qqbot-url-transfer-link.png')
    .role('textarea', { rows: [2, 5] })
    .description('🖼️ 迁移链接操作提示图片的 URL（Markdown 中显示在链接/按钮上方）'),

  /**
   * 📐 qqTransferLinkGuideImageWidth — 迁移链接 Markdown 图片宽度
   * QQ Markdown 图片尺寸格式：![#Wpx #Hpx](url)。
   */
  qqTransferLinkGuideImageWidth: Schema.string()
    .default('1080px')
    .description('📐 Markdown 图片宽度（含 px 单位，如 1080px）'),

  /**
   * 📐 qqTransferLinkGuideImageHeight — 迁移链接 Markdown 图片高度
   * QQ Markdown 图片尺寸格式：![#Wpx #Hpx](url)。
   */
  qqTransferLinkGuideImageHeight: Schema.string()
    .default('888px')
    .description('📐 Markdown 图片高度（含 px 单位，如 888px）'),
  }).description('==== 🔗 手机 QQ 转换链接的图片与说明配置 ===='),

  // ==== 📱 手机 QQ UI 手动配置的图片与说明配置 ====
  Schema.object({
  /**
   * 📝 qqUiSettingsGuideText — 手机 QQ UI 手动配置指南文案
   * 显示在手动配置指南图片与底部按钮之间。
   */
  qqUiSettingsGuideText: Schema.string()
    .default('一个QQ群的官bot全量主动只有群主能设置。请群主按照图片中的步骤，在手机QQ中为群机器人开启“获取群内全部消息”和“机器人主动在群聊内发言”。')
    .role('textarea', { rows: [2, 5] })
    .description('📝 手机QQ手动配置指南说明文字'),

  /**
   * 🖼️ qqUiSettingsGuideShowImage — 手机 QQ UI 手动配置指南图片开关
   * - true  → 在指南消息中附带操作图片
   * - false → 不发送操作图片
   */
  qqUiSettingsGuideShowImage: Schema.boolean()
    .default(true)
    .description('🖼️ 在手机QQ手动配置指南消息中附带操作图片'),

  /**
   * 🖼️ qqUiSettingsGuideImageUrl — 手机 QQ UI 手动配置指南图片 URL
   * 当 qqUiSettingsGuideShowImage 为 true 时使用此 URL 显示图片。
   */
  qqUiSettingsGuideImageUrl: Schema.string()
    .default('https://gitee.com/vincent-zyu/koishi-plugin-get-qq-bot-transfer-link/raw/main/doc/images/qqbot-guide-ui-settings.png')
    .role('textarea', { rows: [2, 5] })
    .description('🖼️ 手机QQ机器人全量消息与主动发言手动配置指南图片 URL'),

  /**
   * 📐 qqUiSettingsGuideImageWidth — 手机 QQ UI 指南 Markdown 图片宽度
   * QQ Markdown 图片尺寸格式：![#Wpx #Hpx](url)。
   */
  qqUiSettingsGuideImageWidth: Schema.string()
    .default('1871px')
    .description('📐 手机QQ手动配置指南的 Markdown 图片宽度（含 px 单位）'),

  /**
   * 📐 qqUiSettingsGuideImageHeight — 手机 QQ UI 指南 Markdown 图片高度
   * QQ Markdown 图片尺寸格式：![#Wpx #Hpx](url)。
   */
  qqUiSettingsGuideImageHeight: Schema.string()
    .default('1044px')
    .description('📐 手机QQ手动配置指南的 Markdown 图片高度（含 px 单位）'),
  }).description('==== 📱 手机 QQ UI 手动配置的图片与说明配置 ===='),

  // ==== 🐛 调试配置 ====
  Schema.object({
  /**
   * 🐛 verboseConsoleLog — 控制台详细日志
   * 打开后，每次发送 QQ 富消息前都会在控制台输出 payload。
   */
  verboseConsoleLog: Schema.boolean()
    .default(false)
    .description('🐛 在控制台输出每次 sendQQMessage 的具体 payload'),
  }).description('==== 🐛 调试配置 ====')
])
