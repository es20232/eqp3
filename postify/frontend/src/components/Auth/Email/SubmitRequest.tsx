import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { submitRequestFormData, submitRequestSchema } from "../../../utils/schemas/SubmitRequestSchema";
import MyContainer from '../../MyContainer';


interface submitRequestParams {
  type: ('PASSWORDRECOVERY' /*| 'mais coisas'*/);
}

const submitRequest: React.FC<submitRequestParams> = ({ type }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<submitRequestFormData>({
    resolver: zodResolver(submitRequestSchema),
  })

  return (
    <MyContainer>
      <Grid container>
        <Grid item xs={12}><Typography variant="h6" textAlign={'center'}>Recuperação de senha</Typography></Grid>
        <Grid item xs={12} display={'flex'} alignItems={'center'}>
          <TextField
            fullWidth
            type="text"
            variant="outlined"
            label="Email"
            placeholder='ex: teste@gmail.com'
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Button variant='contained' type='submit' sx={{ marginLeft: '10px' }}>
            Enviar
          </Button>
        </Grid>
      </Grid>
    </MyContainer>
  );
}

export default submitRequest;