import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography
} from '@mui/material'
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

  const onSubmit: SubmitHandler<registerFormData> = async (data) => {
    await api
      .post('/api/v1/register/', data)
      .then(() => {
        return navigate('/home/')
      })
      .catch((error) => {
        let predictedError = false;
        const data = error.response.data;
        console.log(data);
        if (error.response.status === 400 && data.username) {
          setError("username", {
            type: "manual",
            message: data.username[0]
          })
          predictedError = true;
        }
        if (error.response.status === 400 && data.email) {
          setError("email", {
            type: "manual",
            message: data.email[0]
          })
          predictedError = true;
        }

        if (!predictedError) console.log(error);
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
