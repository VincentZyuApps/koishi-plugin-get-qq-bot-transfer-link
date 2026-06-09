import 'koishi'

interface QQSessionApi {
  sendMessage(channelId: string, content: unknown): Promise<unknown>
}

declare module 'koishi' {
  interface Session {
    qq?: QQSessionApi
  }
}
