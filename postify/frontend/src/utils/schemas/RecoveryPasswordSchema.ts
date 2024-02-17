import { z } from 'zod'

export const RecoveryPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'A senha deve conter, no mínimo, 6 caracteres.' })
      .max(30, { message: 'Este campo não pode conter mais que 30 caracteres' }),
    repeatPassword: z
      .string()
      .min(6, { message: 'A senha deve conter, no mínimo, 6 caracteres.' })
      .max(30, { message: 'Este campo não pode conter mais que 30 caracteres' }),
  })
  .refine(data => data.password === data.repeatPassword, {
    message: 'As senhas devem ser iguais nos campos senha e repetir senha.',
    path: ['repeatPassword'],
  })

export type RecoveryPasswordFormData = z.infer<typeof RecoveryPasswordSchema>
