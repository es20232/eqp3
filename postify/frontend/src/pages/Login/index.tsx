import { Button, Container, Grid, Link, Paper, TextField, Typography } from '@mui/material';

function handleLogin() {

}

const Login = () => {
  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant='h4'>
          Login de usuário
        </Typography>
        <form onSubmit={handleLogin} autoComplete='off'>
          <Grid container spacing={3} alignItems={'center'}>
            <Grid item xs={8}>
              <TextField
                id="usuario"
                label="Usuário"
                variant='outlined'
                fullWidth
              />
              <TextField
                id="senha"
                label="Senha"
                variant='outlined'
                margin='normal'
                fullWidth
              />
            </Grid>
            <Grid item xs={4}><Button type='submit' variant='contained' color="primary" style={{ borderRadius: '38px', marginTop: '10px', marginBottom: '10px' }}>
              Logar
            </Button></Grid>
          </Grid>
        </form>
        <Grid container spacing={3} >
          <Grid item xs={5} display={'flex'} justifyContent={'space-between'}>
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                console.info("cadas");
              }}
            >
              Cadastrar
            </Link>
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                console.info("Link esquci a senha");
              }}
            >
              Esqueci a senha
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default Login;