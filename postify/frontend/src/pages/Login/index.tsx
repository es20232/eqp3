import { Button, Container, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();

  function handleLogin() {
    return navigate('/home')
  }

  return (
    <Container maxWidth={'sm'}>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Grid container>
          <Grid item xs={12} marginBottom={'10px'}>
            <Typography align='center' variant='h4'>
              Login de usuário
            </Typography>
          </Grid>
          <Grid item sm={12} marginBottom={'10px'}>
            <form onSubmit={handleLogin} autoComplete='off'>
              <Grid container spacing={6} alignItems={'center'}>
                <Grid item sm={8}>
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
                <Grid item sm={4}>
                  <Button
                    type='submit'
                    variant='contained'
                    color="primary"
                    style={{ borderRadius: '38px', paddingTop: '10px', paddingBottom: '10px' }}>
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