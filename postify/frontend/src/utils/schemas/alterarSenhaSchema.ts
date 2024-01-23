import { z } from 'zod'

export const alterarSenhaSchema = z
  .object({
    senha_antiga: z
      .string()
      .min(1, { message: 'A senha antiga não pode estar vazia.' }),
    senha_nova: z.string().min(6, {
      message: 'Senhas tem que possuir no minimo 6 caracteres.',
    }),
    senha_nova_confirmar: z.string().min(6, {
      message: 'Senhas tem que possuir no minimo 6 caracteres.',
    }),
  })
  .refine((data) => data.senha_nova === data.senha_nova_confirmar, {
    message: 'As senhas não coincidem.',
    path: ['senha_nova_confirmar'],
  })

export type alterarSenhaFormData = z.infer<typeof alterarSenhaSchema>
