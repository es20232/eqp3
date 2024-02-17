import { z } from 'zod'

export const submitRequestSchema = z
  .object({
    email: z
      .string()
      .email({ message: 'Insira um email válido.' })
      .min(1, { message: 'O email não pode estar vazio.' }),
  })
  .required()

export type submitRequestFormData = z.infer<typeof submitRequestSchema>