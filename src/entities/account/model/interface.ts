import type z from 'zod'
import { accountSchema } from './schema'

export const accountTypes = ['Локальная', 'LDAP'] as const
export type AccountType = (typeof accountTypes)[number]

export type Account = z.output<typeof accountSchema>
export type AccountCreate = z.input<typeof accountSchema>
