import { z } from 'zod'

export const loginSchema = z
  .object({
    username: z.string().min(1, { message: 'O login não pode estar vazia.' })
      .max(50, { message: "Este campo não pode conter mais que 50 caracteres" }),
    password: z.string().min(1, { message: 'A senha não pode estar vazia.' })
      .max(30, { message: "Este campo não pode conter mais que 30 caracteres" }),
  })
  .required()

export type loginFormData = z.infer<typeof loginSchema>
