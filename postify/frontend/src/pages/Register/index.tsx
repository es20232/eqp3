import { Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";

function handleCadastro() {

}

const Cadastro = () => {
  return (
    <Container maxWidth={'sm'}>
      <Paper elevation={4} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant='h6'>
          Cadastro de Novo usuário
        </Typography>
        <form onSubmit={handleCadastro} autoComplete="off">
          <TextField
            required
            type="text"
            id="nome"
            variant="outlined"
            label="Nome Completo"
            margin='normal'
            fullWidth
          />
          <TextField
            required
            type="text"
            id="email"
            variant="outlined"
            label="Email"
            margin='normal'
            fullWidth
          />
          <TextField
            required
            type="number"
            id="telefone"
            variant="outlined"
            label="Telefone"
            margin='normal'
            fullWidth
          />
          <TextField
            required
            type="text"
            id="loginDeUsuario"
            variant="outlined"
            label="Login de usuário"
            margin='normal'
            fullWidth
          />
          <TextField
            required
            type="password"
            id="senha"
            variant="outlined"
            label="Senha"
            margin='normal'
            fullWidth
          />
          <TextField
            required
            type="password"
            id="repeat_senha"
            variant="outlined"
            label="Repetir senha"
            margin='normal'
            fullWidth
          />
          <Grid container display={"flex"} justifyContent={"space-around"} marginTop={'20px'}>
            <Grid item>
              <Button variant="contained" color="primary">
                Cancelar
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary">
                Confirmar
              </Button>
            </Grid>
          </Grid>
        </form>
      </ Paper>
    </ Container>
  )
}

export default Cadastro;
