import { z } from 'zod'

export const loginSchema = z
  .object({
    login: z.string().min(1, { message: 'O login não pode estar vazia.' }),
    password: z.string().min(1, { message: 'A senha não pode estar vazia.' }),
  })
  .required()

export type loginFormData = z.infer<typeof loginSchema>
