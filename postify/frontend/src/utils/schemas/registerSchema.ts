import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(1, { message: 'O nome não pode estar vazio.' })
      .max(50, { message: 'O campo não pode ultrapassar mais que 50 caracteres.' }),
    phone_number: z.string().min(1, { message: 'O telefone não pode estar vazio.' })
      .max(11, { message: 'O campo não pode ultrapassar mais que 11 digitos.' }),
    email: z.string().email({ message: "O email é inválido." })
      .max(50, { message: 'O campo não pode ultrapassar mais que 50 caracteres.' }),
    username: z.string().min(1, { message: 'O login não pode estar vazia.' })
      .max(30, { message: 'O campo não pode ultrapassar mais que 30 caracteres.' }),
    password: z.string().min(1, { message: 'A senha não pode estar vazia.' })
      .max(30, { message: 'O campo não pode ultrapassar mais que 30 caracteres.' }),
    repeatPassword: z.string().min(1, { message: 'A senha não pode estar vazia.' })
      .max(30, { message: 'O campo não pode ultrapassar mais que 30 caracteres.' }),
  })
  .required()
  .refine(data => data.password === data.repeatPassword, {
    message: 'As senhas devem ser iguais nos campos senha e repetir senha.',
    path: ['repeatPassword'],
  })

export type registerFormData = z.infer<typeof registerSchema>