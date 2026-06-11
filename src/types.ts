import type { Session } from 'koishi'

export type BotInfoStyle = 'text' | 'bold' | 'inline' | 'table'

export interface BotIdentity {
  botUin: string
  botUid: string
  groupCode: string
}

export interface QQBotUrlOptions {
  botuin?: string
  botuid?: string
  groupcode?: string
}

export interface ResolveIdentitySuccess {
  ok: true
  identity: BotIdentity
}

export interface ResolveIdentityFailure {
  ok: false
  reason: 'missing-bot-uin' | 'missing-bot-uid' | 'missing-group-code'
  message: string
}

export type ResolveIdentityResult = ResolveIdentitySuccess | ResolveIdentityFailure

export interface QQKeyboardButton {
  id?: string
  render_data: {
    label: string
    style?: number
    visited_label?: string
  }
  action: {
    type: number
    permission?: {
      type: number
      specify_role_ids?: string[]
      specify_user_ids?: string[]
    }
    data: string
    enter?: boolean
    reply?: boolean
    anchor?: number
    click_limit?: number
    unsupport_tips?: string
  }
}

export interface QQKeyboardRow {
  buttons: QQKeyboardButton[]
}

export interface QQKeyboardContent {
  rows: QQKeyboardRow[]
}

export interface TransferPayload {
  page_name: 'ai_group_service_agreement_pop_page'
  groupCode: number
  botUin: number
  botUid: string
  screen: 1
}

export type CommandSession = Session
