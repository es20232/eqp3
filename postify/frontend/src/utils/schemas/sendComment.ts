import { z } from 'zod'

export const sendCommentSchema = z
  .object({
    comment: z.string().min(1, { message: 'O comentário deve conter no mínimo 1 caractere' })
      .max(1000, { message: "O comentário não pode ultrapassar 1000 caracteres." }),
  })

export type sendCommentFormData = z.infer<typeof sendCommentSchema>