import { h, Session } from 'koishi'

// ============ 👤 NapCat 用户查询 ============
/** 通过 NapCat OneBot V11 API 查询用户信息（仅 OneBot V11 平台可用）（其他的onebot实现不知道捏，我只测试过OneBot V11捏） */
export async function handleNapcatGetUser(
  session: Session | undefined,
  userId: string | undefined,
): Promise<string | void> {
  if (session?.platform !== 'onebot') {
    return `${h.quote(session?.messageId)}❌ 仅支持 onebot 平台使用此指令`
  }

  const user = await session?.bot.internal._request('get_stranger_info', { user_id: userId })
  await session?.send(`${h.quote(session?.messageId)}用户信息：${JSON.stringify(user)}`)
}
