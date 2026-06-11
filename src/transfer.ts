import type { Context } from 'koishi'
import type { Config } from './config'
import type {
  BotIdentity,
  QQBotUrlOptions,
  ResolveIdentityResult,
  TransferPayload,
} from './types'

export function buildTransferUrl(identity: BotIdentity): string {
  const payload: TransferPayload = {
    page_name: 'ai_group_service_agreement_pop_page',
    groupCode: Number(identity.groupCode),
    botUin: Number(identity.botUin),
    botUid: identity.botUid,
    screen: 1,
  }

  return `https://club.vip.qq.com/transfer?open_kuikly_info=${encodeURIComponent(JSON.stringify(payload))}`
}

export function resolveBotIdentity(
  session: any,
  config: Config,
  options: QQBotUrlOptions,
  groupCodeArg: string | undefined,
  ctx?: Context,
): ResolveIdentityResult {
  const botUin = options.botuin || config.defaultBotUin
  const botUid = options.botuid || config.defaultBotUid
  let groupCode: string
  let groupCodeSource = 'unknown'

  const logGroupCodeSource = () => {
    if (config.verboseConsoleLog && ctx) {
      ctx.logger('get-qq-bot-transfer-link').info(
        'qqbot-url groupCode群号参数的来源: %s, value: %s',
        groupCodeSource,
        groupCode || '<empty>',
      )
    }
  }

  if (config.requireGroupCode) {
    if (groupCodeArg) {
      groupCode = groupCodeArg
      groupCodeSource = 'arg'
    } else if (options.groupcode) {
      groupCode = options.groupcode
      groupCodeSource = 'option.groupcode'
    }

    if (!groupCode!) {
      groupCodeSource = 'missing'
      logGroupCodeSource()
      return {
        ok: false,
        reason: 'missing-group-code',
        message: '',
      }
    }
  } else {
    if (groupCodeArg) {
      groupCode = groupCodeArg
      groupCodeSource = 'arg'
    } else if (options.groupcode) {
      groupCode = options.groupcode
      groupCodeSource = 'option.groupcode'
    } else if (config.defaultGroupCode) {
      groupCode = config.defaultGroupCode
      groupCodeSource = 'config.defaultGroupCode'
    } else if (session?.guildId) {
      groupCode = session.guildId
      groupCodeSource = 'session.guildId'
    }
  }

  logGroupCodeSource()

  if (!botUin) {
    return {
      ok: false,
      reason: 'missing-bot-uin',
      message: '❌ 缺少 botUin（官BotQQ号），请通过 --botuin 传入或配置 defaultBotUin',
    }
  }

  if (!botUid) {
    return {
      ok: false,
      reason: 'missing-bot-uid',
      message: '❌ 缺少 botUid（官Bot UID），请通过 --botuid 传入或配置 defaultBotUid',
    }
  }

  if (!groupCode!) {
    return {
      ok: false,
      reason: 'missing-group-code',
      message: '❌ 缺少 groupCode（群号），请通过 --groupcode 传入或配置 defaultGroupCode',
    }
  }

  return {
    ok: true,
    identity: { botUin, botUid, groupCode: groupCode! },
  }
}
