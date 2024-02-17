import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../utils/api/api'
import {
  submitRequestFormData,
  submitRequestSchema,
} from '../../../utils/schemas/SubmitRequestSchema'
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

  const onSubmit: SubmitHandler<submitRequestFormData> = async (data) => {
    console.log(data)
    await api
      .post('/api/v1/password-reset', {
        email: data.email,
      })
      .then((response) => {
        console.log(response)
        navigate('/verified-email')
      })
      .catch((error) => console.log(error))
  }

  return (
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
  )
}

export default SubmitRequest
