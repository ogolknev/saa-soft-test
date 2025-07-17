import { z } from 'zod'
import { accountTypes } from '../config/account-types'

export const accountSchema = z
  .object({
    tags: z
      .string()
      .nonempty('Обязательное поле')
      .transform((tagsString) =>
        tagsString
          .split(';')
          .map((tag) => tag.trim())
          .filter(Boolean),
      ),
    type: z.enum(accountTypes).default('Локальная'),
    login: z.string().nonempty('Обязательное поле').max(100, 'Максимум 100 символов'),
    password: z.string().max(100, 'Максимум 100 символов').nullable(),
  })
  .refine((data) => data.type === 'Локальная' && data.password, {
    error: 'Обязательное поле',
    path: ['password'],
  })
  .transform((data) => {
    if (data.type === 'LDAP') data.password = null

    return data
  })
