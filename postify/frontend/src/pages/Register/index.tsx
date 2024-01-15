import { Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
  const navigate = useNavigate();
  const URL = "http://127.0.0.1:8000"

  const [pessoa, setPessoa] = useState<{ nome: string, email: string, telefone: string, login: string, senha: string, repeteSenha: string }>({
    nome: "", email: "", telefone: "", login: "", senha: "", repeteSenha: ""
  });

  const handleChance = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name == "nome") {
      setPessoa({
        ...pessoa,
        nome: value
      })
    } else if (name == "email") {
      setPessoa({
        ...pessoa,
        email: value
      })
    } else if (name == "telefone") {
      setPessoa({
        ...pessoa,
        telefone: value
      })
    } else if (name == "loginDeUsuario") {
      setPessoa({
        ...pessoa,
        login: value
      })
    } else if (name == "senha") {
      setPessoa({
        ...pessoa,
        senha: value
      })
    } else if (name == "repeat_senha") {
      setPessoa({
        ...pessoa,
        repeteSenha: value
      })
    }
  };

  const handleCadastro = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pessoa.senha != pessoa.repeteSenha) {
      alert("Senhas não compativeis")
      return;
    }

    const data = {
      "name": pessoa.nome,
      "username": pessoa.login,
      "email": pessoa.email,
      "password": pessoa.senha,
      "phone_number": pessoa.telefone
    };

    try {
      const resposta = await fetch(
        URL + "/api/v1/register/", {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(data)
      }
      );
      console.log(data)
      if (!resposta.ok) {
        alert("Erro ao fazer cadastro, por favor, verifique se os dados estão corretos e tente novamente.");
        throw new Error(`HTTP error! status: ${resposta.status}`);
      }

      alert("Cadastro efetuado com sucesso!")
    } catch (error) {
      console.error('Erro:', error);
    }

    //return navigate('/')
  }

  const handleCancele = () => {
    return navigate("/");
  }

  return (
    <Container maxWidth={'sm'}>
      <Paper elevation={4} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography align="center" variant='h6'>
          Cadastro de Novo usuário
        </Typography>
        <form onSubmit={handleCadastro} autoComplete="off">
          <TextField
            required
            type="text"
            name="nome"
            variant="outlined"
            label="Nome Completo"
            margin='normal'
            onChange={handleChance}
            fullWidth
          />
          <TextField
            required
            type="text"
            name="email"
            variant="outlined"
            label="Email"
            margin='normal'
            onChange={handleChance}
            fullWidth
          />
          <TextField
            required
            type="number"
            name="telefone"
            variant="outlined"
            label="Telefone"
            margin='normal'
            onChange={handleChance}
            fullWidth
          />
          <TextField
            required
            type="text"
            name="loginDeUsuario"
            variant="outlined"
            label="Login de usuário"
            margin='normal'
            onChange={handleChance}
            fullWidth
          />
          <TextField
            required
            type="password"
            name="senha"
            variant="outlined"
            label="Senha"
            margin='normal'
            onChange={handleChance}
            fullWidth
          />
          <TextField
            required
            type="password"
            name="repeat_senha"
            variant="outlined"
            label="Repetir senha"
            margin='normal'
            onChange={handleChance}
            fullWidth
          />
          <Grid container display={"flex"} justifyContent={"space-around"} marginTop={'20px'}>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleCancele}>
                Cancelar
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" type="submit">
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
