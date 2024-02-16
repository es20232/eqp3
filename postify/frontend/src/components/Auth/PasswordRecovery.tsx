import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import MyContainer from '../MyContainer';

const passwordRecovery: React.FC = () => {
  return (
    <MyContainer>
      <Grid container>
        <Grid item xs={12}><Typography variant="h6" textAlign={'center'}>Alterar senha</Typography></Grid>
        <Grid item xs={12}>
          <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <TextField
              id="password"
              label="senha"
              placeholder="exemplo"
              type="password"
              margin="normal"
              fullWidth
            />
            <TextField
              id="repeatPassword"
              label="repetir senha"
              placeholder="exemplo"
              type="password"
              margin="normal"
              fullWidth
            />
            <Button type="submit" variant="contained">Confirmar</Button>
          </form>
        </Grid>
      </Grid>
    </MyContainer>
  );
}

export default passwordRecovery;