import type z from 'zod'
import { accountSchema } from './schema'
import type { accountTypes } from '../config/account-types'

export type AccountType = (typeof accountTypes)[number]

export type AccountData = z.output<typeof accountSchema>
export type AccountCreate = z.input<typeof accountSchema>

export type Account = AccountData & { id: number }
