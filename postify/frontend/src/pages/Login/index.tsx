import { zodResolver } from '@hookform/resolvers/zod'
import {
  Alert,
  Button,
  Container,
  Grid,
  Link,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { api } from '../../utils/api/api'
import { getUsernameFromToken } from '../../utils/auth/getUsernameFromToken'
import { loginFormData, loginSchema } from '../../utils/schemas/loginSchema'
import useAuthStore from '../../utils/stores/authStore'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const [loginError, setLoginError] = useState<{ error: boolean, message: string }>({
    error: false, message: ""
  })

  const onSubmit: SubmitHandler<loginFormData> = async (data) => {
    await api
      .post('api/v1/login', data)
      .then((response) => {
        login(
          response.data.access,
          response.data.refresh,
          getUsernameFromToken(response.data.access),
        )
        navigate('/home')
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setError("username", {})
          setError("password", {})
          setLoginError({
            error: true, message: error.response.data?.detail
          });
        } else {
          console.log(error)
        }
      })
  }

  return (
    <Container maxWidth={'sm'}>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Grid container>
          <Grid item xs={12} marginBottom={'10px'}>
            <Typography align="center" variant="h4">
              Login de usuário
            </Typography>
          </Grid>
          <Grid item sm={12} marginBottom={'10px'}>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <Grid container spacing={6} alignItems={'center'}>
                <Grid item sm={8}>
                  <TextField
                    id="login"
                    label="Login"
                    variant="outlined"
                    fullWidth
                    {...register('username')}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                  />
                  <TextField
                    id="password"
                    label="Senha"
                    variant="outlined"
                    margin="normal"
                    type="password"
                    fullWidth
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                  {loginError.error &&
                    <Alert variant="standard" severity='error'>{loginError.message}</Alert>
                  }
                </Grid>
                <Grid item sm={4}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{
                      borderRadius: '38px',
                      paddingTop: '10px',
                      paddingBottom: '10px',
                    }}
                  >
                    Logar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid container item sm={5} justifyContent="space-between">
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                return navigate('/register')
              }}
            >
              Cadastrar
            </Link>
            <Link component="button" variant="body2">
              Esqueci a senha
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default Login
