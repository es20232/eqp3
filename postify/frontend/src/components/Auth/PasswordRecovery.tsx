import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../utils/api/api'
import {
  RecoveryPasswordFormData,
  RecoveryPasswordSchema,
} from '../../utils/schemas/RecoveryPasswordSchema'
import MyContainer from '../MyContainer'

const PasswordRecovery = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const {
    register: registerPassword,
    handleSubmit: submitPassword,
    reset: resetSenhas,
    formState: { errors: errorsPassword },
  } = useForm<RecoveryPasswordFormData>({
    resolver: zodResolver(RecoveryPasswordSchema),
  })

  const onSubmit: SubmitHandler<RecoveryPasswordFormData> = async (data) => {
    await api
      .put(`/api/v1/password-reset/${token}/`, {
        new_password: data.password,
      })
      .then((response) => {
        console.log(response)
        navigate('/')
      })
      .catch((error) => console.log(error))
  }

  return (
    <MyContainer>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6" textAlign={'center'}>
            Alterar senha
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form
            onSubmit={submitPassword(onSubmit)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TextField
              label="senha"
              placeholder="exemplo"
              type="password"
              margin="normal"
              fullWidth
              {...registerPassword('password')}
              error={!!errorsPassword.password}
              helperText={errorsPassword.password?.message}
            />
            <TextField
              label="repetir senha"
              placeholder="exemplo"
              type="password"
              margin="normal"
              fullWidth
              {...registerPassword('repeatPassword')}
              error={!!errorsPassword.repeatPassword}
              helperText={errorsPassword.repeatPassword?.message}
            />
            <Button type="submit" variant="contained">
              Confirmar
            </Button>
          </form>
        </Grid>
      </Grid>
    </MyContainer>
  )
}

export default PasswordRecovery
