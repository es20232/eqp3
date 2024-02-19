import { zodResolver } from '@hookform/resolvers/zod'
import {
  Alert,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import MyPaper from '../../components/MyPaper'
import { api } from '../../utils/api/api'
import {
  getEmailFromToken,
  getIdFromToken,
  getNameFromToken,
  getPhoneNumberFromToken,
  getProfileImageFromToken,
  getUsernameFromToken,
} from '../../utils/auth/getPropsFromToken'
import { loginFormData, loginSchema } from '../../utils/schemas/loginSchema'
import useAuthStore from '../../utils/stores/authStore'
import useUserStore from '../../utils/stores/userStore'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const { setUserProps, setProfileImage } = useUserStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const [loginError, setLoginError] = useState<{
    error: boolean
    message: string
  }>({
    error: false,
    message: '',
  })

  const getProps = (accessToken: string) => {
    const id = getIdFromToken(accessToken)
    const name = getNameFromToken(accessToken)
    const username = getUsernameFromToken(accessToken)
    const email = getEmailFromToken(accessToken)
    const phoneNumber = getPhoneNumberFromToken(accessToken)
    const profileImage = getProfileImageFromToken(accessToken)

    setUserProps(id, name, username, email, phoneNumber)
    setProfileImage(profileImage)
  }

  const onSubmit: SubmitHandler<loginFormData> = async (data) => {
    await api
      .post('api/v1/login', data)
      .then((response) => {
        login(response.data.access, response.data.refresh)
        getProps(response.data.access)
        navigate('/home')
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.log(error.response)
          setError('username', {})
          setError('password', {})
          setLoginError({
            error: true,
            message: error.response.data?.detail,
          })
        } else if (error.response.status === 403) {
          setLoginError({
            error: true,
            message: "Houve mais de 3 tentativas ao fazer login. A conta está suspensa, tente novamente após 24 horas.",
          })
        } else {
          console.log(error)
        }
      })
  }

  return (
    <Container maxWidth={'sm'}>
      <MyPaper elevation={3}>
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
                  {loginError.error && (
                    <Alert variant="standard" severity="error">
                      {loginError.message}
                    </Alert>
                  )}
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
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                return navigate('/password-recovery')
              }}
            >
              Esqueci a senha
            </Link>
          </Grid>
        </Grid>
      </MyPaper>
    </Container>
  )
}

export default Login
