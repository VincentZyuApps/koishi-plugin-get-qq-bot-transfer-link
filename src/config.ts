import { Schema } from 'koishi'

/**
 * 📋 插件配置项接口
 */
export interface Config {
  // ==== 📝 基础发送配置 ====
  /** 📝 是否在 QQ 官方平台使用 Markdown 格式发送消息 */
  useMarkdown: boolean
  /** 🔗 是否在消息末尾添加一个跳转链接按钮 */
  addJumpButton: boolean

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
  /** 🖼️ 是否在消息中附带操作提示图片 */
  showImage: boolean
  /** 🖼️ 操作提示图片的 URL */
  imageUrl: string
  /** 📐 Markdown 图片宽度（含 px 单位） */
  imageWidth: string
  /** 📐 Markdown 图片高度（含 px 单位） */
  imageHeight: string
  /** ❌ 缺群号时的报错提示文本 */
  missingGroupCodeMessage: string
  /** 🧭 QQ 平台缺群号时的发送模式 */
  missingGroupCodeSendMode: 'text' | 'markdown' | 'markdown_button'
  /** 📝 缺群号时 QQ Markdown 消息的 markdown content */
  missingGroupCodeMarkdownContent: string
  /** 🎹 缺群号时 QQ Markdown 消息的 keyboard JSON（为空则不发按钮） */
  missingGroupCodeKeyboardJson: string

  // ==== 🖼️ 图片与说明配置 ====
  /** 📱 版本兼容提示文案 */
  versionHint: string

  // ==== 🐛 调试配置 ====
  /** 🐛 是否在控制台输出发送 payload */
  verboseConsoleLog: boolean
}

export const Config: Schema<Config> = Schema.intersect([
  // ==== 📝 基础发送配置 ====
  Schema.object({
  /**
   * 📝 useMarkdown — Markdown 开关
   * - true  → 发送 Markdown 富文本消息（支持链接高亮、排版更美观）✨
   * - false → 发送纯文本消息（最简兼容模式）📄
   * 💡 非 QQ 官方平台时自动降级为纯文本，不受此配置影响。
   */
  useMarkdown: Schema.boolean().default(true)
    .description('📝 在QQ官方平台使用Markdown按钮格式发送配置链接（而非贼长的纯文本链接）✨'),

  /**
   * 🔗 addJumpButton — 跳转按钮开关
   * - true  → 消息底部挂载一个「🌐 打开配置链接」按钮，点击一键跳转 🚀
   * - false → 不添加按钮，仅展示文字链接 📄
   * 💡 开启后自动启用 Markdown 模式（按钮依赖 msg_type: 2）。
   */
  addJumpButton: Schema.boolean().default(true)
    .description('🔗 在QQ官方Bot平台的消息末尾添加一个跳转链接按钮，点击直接打开配置页 🚀'),
  }).description('==== 📝 基础发送配置 ===='),

  // ==== 🧩 默认参数配置 ====
  Schema.object({
  /**
   * 🆔 defaultBotUin — 默认官Bot QQ号
   * 当指令未传 --botuin 时使用此值。
   * 留空且未传参时会报错 ⚠️
   */
  defaultBotUin: Schema.string().default('')
    .description('🆔 默认官Bot的QQ号（botUin），未传 --botuin 时兜底使用'),

  /**
   * 🔑 defaultBotUid — 默认官Bot UID
   * 当指令未传 --botuid 时使用此值。
   * 留空且未传参时会报错 ⚠️
   */
  defaultBotUid: Schema.string().default('')
    .description('🔑 默认官Bot的UID（botUid），未传 --botuid 时兜底使用 <br/>  <i> <b>建议实践</b>: 用Napcat获取一次官bot的uid，然后就填写在这里，一劳永逸  </i>'),

  /**
   * 👥 defaultGroupCode — 默认群号
   * 当指令未传 --groupcode 时使用此值。
   * 留空则使用当前会话群号兜底。
   */
  defaultGroupCode: Schema.string().default('')
    .description('👥 默认群号（groupCode），未传 --groupcode 时兜底使用'),

  /**
   * 🔒 requireGroupCode — 强制要求传入群号
   * - true  → 必须通过 arg 或 --groupcode 传入群号，否则报错
   * - false → 允许 fallback 到配置项或当前会话群号
   */
  requireGroupCode: Schema.boolean().default(true)
    .description('🔒 强制要求传入群号（arg 或 --groupcode），忽略配置项 fallback。提示：可用 onebot 的 inspect 指令获取群号'),
  }).description('==== 🧩 默认参数配置 ===='),

  // ==== 🎨 配置链接消息样式 ====
  Schema.object({
  /**
   * 📋 showBotInfo — 显示 Uin/Uid/GroupCode 信息
   * - true  → 在返回消息中附加上 uin / uid / groupCode 信息 📊
   * - false → 不显示，仅输出链接 🔗
   */
  showBotInfo: Schema.boolean().default(true)
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
  ]).role('radio').default('bold')
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
  ]).role('radio').default('markdown')
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
    .default('{"rows":[{"buttons":[{"render_data":{"label":"📝再试一次","style":1},"action":{"type":2,"permission":{"type":2},"data":"/免艾特申请","enter":true}},{"render_data":{"label":"🎈玩玩其他的","style":1},"action":{"type":2,"permission":{"type":2},"data":"/帮助菜单","enter":true}}]}]}')
    .role('textarea', { rows: [5, 20] })
    .description('🎹 缺群号时 QQ Markdown 消息的 keyboard JSON（填入 rows 数组，为空则不发按钮降级为纯文本）'),
  }).description('==== ❌ 缺群号提示配置 ===='),

  // ==== 🖼️ 图片与说明配置 ====
  Schema.object({
  /**
   * 📱 versionHint — 版本兼容提示文案
   * 出现在链接/按钮下方的版本兼容说明文字。
   */
  versionHint: Schema.string()
    .default('安卓和iOS QQ 9.2.90及以上版本可用。iOS也可以直接去设置里配置。')
    .role('textarea', { rows: [2, 5] })
    .description('📱 版本兼容提示文案，出现在链接/按钮下方'),

  /**
   * 🖼️ showImage — 操作提示图片开关
   * - true  → 在链接/按钮上方附带操作提示图片 🖼️
   * - false → 不显示图片
   */
  showImage: Schema.boolean().default(true)
    .description('🖼️ 在消息中附带操作提示图片（放在链接/按钮上方）'),

  /**
   * 🖼️ imageUrl — 操作提示图片 URL
   * 当 showImage 为 true 时使用此 URL 显示图片。
   */
  imageUrl: Schema.string()
    .default('https://gitee.com/vincent-zyu/koishi-plugin-get-qq-bot-transfer-link/raw/main/doc/操作提示.png')
    // .role('link')
    .role('textarea', { rows: [2, 5] })
    .description('🖼️ 操作提示图片的 URL（Markdown 中显示在链接/按钮上方）'),

  /**
   * 📐 imageWidth — Markdown 图片宽度
   * QQ Markdown 图片尺寸格式：![#Wpx #Hpx](url)
   */
  imageWidth: Schema.string().default('1080px')
    .description('📐 Markdown 图片宽度（含 px 单位，如 1080px）'),

  /**
   * 📐 imageHeight — Markdown 图片高度
   * QQ Markdown 图片尺寸格式：![#Wpx #Hpx](url)
   */
  imageHeight: Schema.string().default('888px')
    .description('📐 Markdown 图片高度（含 px 单位，如 888px）'),
  }).description('==== 🖼️ 图片与说明配置 ===='),

  // ==== 🐛 调试配置 ====
  Schema.object({
  /**
   * 🐛 verboseConsoleLog — 控制台详细日志
   * 打开后，每次发送 QQ 富消息前都会在控制台输出 payload。
   */
  verboseConsoleLog: Schema.boolean().default(false)
    .description('🐛 在控制台输出每次 sendQQMessage 的具体 payload'),
  }).description('==== 🐛 调试配置 ====')
])
