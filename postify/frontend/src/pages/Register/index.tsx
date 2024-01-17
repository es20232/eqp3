import { Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
  const navigate = useNavigate();
  const URL = "http://127.0.0.1:8000"

  const [pessoa, setPessoa] = useState<{ nome: string, email: string, telefone: string, login: string, senha: string, repeteSenha: string }>({
    nome: "", email: "", telefone: "", login: "", senha: "", repeteSenha: ""
  });

  const [campoErrado, setCampoErrado] = useState<{ username: boolean, email: boolean, password: boolean }>({
    username: false, email: false, password: false
  });
  const [textoErro, setTextoErro] = useState<{ username: String, email: string, password: string }>({
    username: "", email: "", password: ""
  })

  useEffect(() => {
    if (campoErrado.email == true) {
      setTextoErro({
        ...textoErro,
        email: "Este email já está sendo usado."
      })
    } else {
      setTextoErro({
        ...textoErro,
        email: ""
      })
    }

    if (campoErrado.username == true) {
      setTextoErro({
        ...textoErro,
        username: "Este usuário já existe."
      })
    } else {
      setTextoErro({
        ...textoErro,
        username: ""
      })
    }
  }, [campoErrado])

  useEffect(() => {
    if ((pessoa.senha == pessoa.repeteSenha && pessoa.senha.length > 0 && pessoa.repeteSenha.length > 0) ||
      (pessoa.senha.length == 0 && pessoa.repeteSenha.length == 0)) {
      setCampoErrado({
        ...campoErrado,
        password: false
      })
      setTextoErro({
        ...textoErro,
        password: ""
      })
    } else {
      setCampoErrado({
        ...campoErrado,
        password: true
      })
    }
  }, [pessoa, setCampoErrado, campoErrado]);

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
    if (campoErrado.password) return;

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

      if (!resposta.ok) {
        let campoEmail = false;
        let campoUsuario = false;
        const dados_resposta = await resposta.json();
        console.log(dados_resposta);

        if (dados_resposta.email != null) {
          campoEmail = true;
        }
        if (dados_resposta.username != null) {
          campoUsuario = true;
        }

        setCampoErrado({
          ...campoErrado,
          username: campoUsuario,
          email: campoEmail
        })
      } else {
        alert("Cadastro efetuado com sucesso!");
      }
    } catch (error) {
      console.error('Erro:', error);
    }

    return navigate('/')
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
            value={pessoa.nome}
            onChange={handleChance}
            fullWidth
          />
          <TextField
            required
            error={campoErrado.email}
            helperText={textoErro.email}
            type="text"
            name="email"
            variant='outlined'
            label="Email"
            margin='normal'
            value={pessoa.email}
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
            value={pessoa.telefone}
            onChange={handleChance}
            fullWidth
          />
          <TextField
            required
            error={campoErrado.username}
            helperText={textoErro.username}
            type="text"
            name="loginDeUsuario"
            variant='outlined'
            label="Login de usuário"
            margin='normal'
            value={pessoa.login}
            onChange={handleChance}
            fullWidth
          />
          <TextField
            required
            error={campoErrado.password}
            helperText={textoErro.password}
            type="password"
            name="senha"
            variant='outlined'
            label="Senha"
            margin='normal'
            value={pessoa.senha}
            onChange={handleChance}
            fullWidth
          />
          <TextField
            required
            error={campoErrado.password}
            helperText={textoErro.password}
            type="password"
            name="repeat_senha"
            variant='outlined'
            label="Repetir senha"
            margin='normal'
            value={pessoa.repeteSenha}
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
