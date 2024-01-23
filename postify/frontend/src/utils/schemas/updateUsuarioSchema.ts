import { z } from 'zod'

export const updateUsuarioSchema = z
  .object({
    name: z.string().min(1, { message: 'O nome não pode estar vazio.' }),
    username: z.string().min(1, { message: 'O usuário não pode estar vazio.' }),
    email: z
      .string()
      .email({ message: 'Insira um email válido.' })
      .min(1, { message: 'O email não pode estar vazio.' }),
    phoneNumber: z
      .string()
      .min(1, { message: 'O telefone não pode estar vazio.' }),
  })
  .required()

export type updateUsuarioFormData = z.infer<typeof updateUsuarioSchema>
