import { Context, h } from 'koishi'
import { Config } from './config'
import { buildMarkdownMessage, sendQQMessage } from './qq'

export const name = 'get-qq-bot-transfer-link'
export { Config }
export { usage } from './usage'

export function apply(ctx: Context, config: Config) {

  ctx.command('napcat-getuser [userId:string]', '请在napcat使用这个指令(其他的onebot实现不知道能不能用捏)')
    .action(async ({ session }, userId) => {
      if (session?.platform !== 'onebot') return `${h.quote(session?.messageId)}❌ 仅支持 onebot 平台使用此指令`;
      const user = await session?.bot.internal._request('get_stranger_info', { user_id: userId })
      await session?.send(`${h.quote(session?.messageId)}用户信息：${JSON.stringify(user)}`)
    })

  ctx.command('qqbot-url [groupCodeArg:string]', '传参是官bot的QQ号')
    .option('botuin', '-u <botuin:string> 官Bot的QQ号')
    .option('botuid', '-i <botuid:string> 官Bot的UID')
    .option('groupcode', '-g <groupcode:string> 群号')
    .action(async ({ session, options }, groupCodeArg) => {
      // ── 优先级: arg > option > config > 报错 ──
      const botUin = options.botuin || config.defaultBotUin
      const botUid = options.botuid || config.defaultBotUid
      let groupCode: string
      if (config.requireGroupCode) {
        groupCode = groupCodeArg || options.groupcode
        if (!groupCode) return `${h.quote(session?.messageId)}${config.missingGroupCodeMessage}`
      } else {
        groupCode = groupCodeArg || options.groupcode || config.defaultGroupCode || session?.guildId
      }

      if (!botUin) return '❌ 缺少 botUin（官BotQQ号），请通过 --botuin 传入或配置 defaultBotUin'
      if (!botUid) return '❌ 缺少 botUid（官Bot UID），请通过 --botuid 传入或配置 defaultBotUid'
      if (!groupCode) return '❌ 缺少 groupCode（群号），请通过 --groupcode 传入或配置 defaultGroupCode'

      const jsonObj = {
        page_name: 'ai_group_service_agreement_pop_page',
        groupCode: Number(groupCode),
        botUin: Number(botUin),
        botUid,
        screen: 1,
      }

      const url = `https://club.vip.qq.com/transfer?open_kuikly_info=${encodeURIComponent(JSON.stringify(jsonObj))}`

      const isQQ = session?.platform === 'qq'
      if (isQQ && session?.qq && (config.useMarkdown || config.addJumpButton)) {
        await sendQQMessage(session, buildMarkdownMessage(url, config.addJumpButton, config.showBotInfo, config.showImage, config.imageUrl, config.imageWidth, config.imageHeight, botUin, botUid, groupCode, config.versionHint, config.qqMarkdownBotInfoStyle))
      } else {
        const imageBlock = config.showImage ? `${h.image(config.imageUrl)}\n` : ''
        const infoBlock = config.showBotInfo
          ? `🆔 botUin：${botUin}\n🔑 botUid：${botUid}\n👥 groupCode：${groupCode}\n\n`
          : ''
        await session?.send(`${infoBlock}官Bot全量主动配置链接（${config.versionHint}）：\n${imageBlock}${url}`)
      }
    })

}
