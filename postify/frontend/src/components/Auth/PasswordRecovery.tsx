import { zodResolver } from '@hookform/resolvers/zod'
import { AlertColor, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../utils/api/api'
import {
  RecoveryPasswordFormData,
  RecoveryPasswordSchema,
} from '../../utils/schemas/RecoveryPasswordSchema'
import AlertInformativo from '../AlertInformativo'
import MyContainer from '../MyContainer'

const PasswordRecovery = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const {
    register: registerPassword,
    handleSubmit: submitPassword,
    formState: { errors: errorsPassword },
  } = useForm<RecoveryPasswordFormData>({
    resolver: zodResolver(RecoveryPasswordSchema),
  })

  const [status, setStatus] = useState<{ erro: boolean, sucess: boolean, message: string }>({
    erro: false, sucess: false, message: ''
  });

  const alert = () => {
    var color: AlertColor;
    if (status.erro) color = 'error'
    else color = 'success'

    return (
      <AlertInformativo
        message={status.message}
        severityMessage={color}
      />
    );
  }

  const onSubmit: SubmitHandler<RecoveryPasswordFormData> = async (data) => {
    await api
      .put(`/api/v1/password-reset/${token}/`, {
        new_password: data.password,
      })
      .then((response) => {
        console.log(response)
        setStatus({
          ...status,
          sucess: true,
          message: response?.data.message
        })
        setTimeout(() => {
          navigate('/')
        }, 3000)
      })
      .catch(() => {
        setStatus({
          ...status,
          erro: true,
          message: 'Houve algum erro ao tentar alterar a senha'
        })
        setTimeout(() => {
          navigate('/')
        }, 5000)
      })
  }

  return (
    <React.Fragment>
      {(status.erro || status.sucess) && alert()}
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
              <Button type="submit" variant="contained" disabled={(status.erro || status.sucess)}>
                Confirmar
              </Button>
            </form>
          </Grid>
        </Grid>
      </MyContainer>
    </React.Fragment>
  )
}

export default PasswordRecovery
