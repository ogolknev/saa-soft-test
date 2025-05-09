export const accountTypes = ['LDAP', 'Локальная'] as const
export type AccountType = (typeof accountTypes)[number]
