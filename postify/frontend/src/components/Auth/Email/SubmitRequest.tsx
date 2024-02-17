import { zodResolver } from '@hookform/resolvers/zod'
import { AlertColor, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../utils/api/api'
import {
  submitRequestFormData,
  submitRequestSchema,
} from '../../../utils/schemas/SubmitRequestSchema'
import AlertInformativo from '../../AlertInformativo'
import MyContainer from '../../MyContainer'

const SubmitRequest = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<submitRequestFormData>({
    resolver: zodResolver(submitRequestSchema),
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

  const onSubmit: SubmitHandler<submitRequestFormData> = async (data) => {
    console.log(data)
    await api
      .post('/api/v1/password-reset', {
        email: data.email,
      })
      .then((response) => {
        setStatus({
          ...status,
          sucess: true, message: response.data.message
        })
        setTimeout(() => {
          navigate('/')
        }, 3000)
      })
      .catch((error) => {
        setStatus({
          ...status,
          erro: true, message: 'e-mail não enviado. Por favor, insira um email válido ou tente novamente mais tarde.'
        })
      })
  }

  return (
    <React.Fragment>
      {(status.erro || status.sucess) && alert()}
      <MyContainer>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6" textAlign={'center'}>
              Recuperação de senha
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TextField
                fullWidth
                type="text"
                variant="outlined"
                label="Email"
                placeholder="ex: teste@gmail.com"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{ marginLeft: '10px' }}
              >
                Enviar
              </Button>
            </form>
          </Grid>
        </Grid>
      </MyContainer>
    </React.Fragment>
  )
}

export default SubmitRequest
