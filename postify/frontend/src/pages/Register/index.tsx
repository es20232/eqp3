import { zodResolver } from '@hookform/resolvers/zod'
import {
  Alert,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { api } from '../../utils/api/api'
import { registerFormData, registerSchema } from '../../utils/schemas/registerSchema'

const Cadastro = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<registerFormData>({
    resolver: zodResolver(registerSchema),
  })

  const [registryError, setRegistryError] = useState<{ error: boolean, message: string[] }>({
    error: false, message: []
  })

  const onSubmit: SubmitHandler<registerFormData> = async (data) => {
    await api
      .post('/api/v1/register/', data)
      .then(() => {
        return navigate('/home/')
      })
      .catch((error) => {
        const data = error.response.data;
        let predictedError = false;
        let message = "";

        if (error.response.status === 400 && data.username) {
          setError("username", {});
          predictedError = true;
          message = data.username[0] + "\n";
        }
        if (error.response.status === 400 && data.email) {
          setError("email", {});
          predictedError = true;
          message += data.email[0]
        }

        if (!predictedError) setRegistryError({ error: false, message: [] })
        else setRegistryError({ error: true, message: message.split("\n") })
      })
  }

  const handleCancele = () => {
    return navigate('/')
  }

  return (
    <Container maxWidth={'sm'}>
      <Paper elevation={4} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography align="center" variant="h6">
          Cadastro de Novo usuário
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <TextField
            fullWidth
            type="text"
            variant="outlined"
            label="Nome Completo"
            margin="normal"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            fullWidth
            type="text"
            variant="outlined"
            label="Email"
            placeholder='ex: teste@gmail.com'
            margin="normal"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            type="number"
            variant="outlined"
            label="Telefone"
            margin="normal"
            placeholder='ex: 86911111111'
            {...register('phone_number')}
            error={!!errors.phone_number}
            helperText={errors.phone_number?.message}
          />
          <TextField
            fullWidth
            type="text"
            variant="outlined"
            label="Login de usuário"
            margin="normal"
            {...register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            fullWidth
            type="password"
            variant="outlined"
            label="Senha"
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            fullWidth
            type="password"
            variant="outlined"
            label="Repetir senha"
            margin="normal"
            {...register('repeatPassword')}
            error={!!errors.repeatPassword}
            helperText={errors.repeatPassword?.message}
          />
          {registryError.error &&
            <Alert variant='standard' severity='error' style={{ alignItems: 'center' }}>
              {registryError.message.map((line, i) =>
                <p key={i}>{line}</p>
              )}
            </Alert>
          }
          <Grid
            container
            display={'flex'}
            justifyContent={'space-around'}
            marginTop={'20px'}
          >
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCancele}
              >
                Cancelar
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" type="submit">
                Confirmar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Cadastro
