import { Button, Container, Grid, Paper, TextField, TextFieldVariants, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
  const navigate = useNavigate();
  const URL = "http://127.0.0.1:8000"

  const [pessoa, setPessoa] = useState<{ nome: string, email: string, telefone: string, login: string, senha: string, repeteSenha: string }>({
    nome: "", email: "", telefone: "", login: "", senha: "", repeteSenha: ""
  });

  const [config_textField, setConfig_textField] = useState<{
    erro_login: boolean,
    variant_login: TextFieldVariants,
    helperText_login: string,
    erro_email: boolean,
    variant_email: TextFieldVariants,
    helperText_email: string,
    erro_senha: boolean,
    variant_senha: TextFieldVariants,
    helperText_senha: string
  }>({
    erro_login: false,
    variant_login: 'outlined',
    helperText_login: "",
    erro_email: false,
    variant_email: 'outlined',
    helperText_email: "",
    erro_senha: false,
    variant_senha: 'outlined',
    helperText_senha: ""
  })

  function dados_corretos() {
    if (pessoa.senha != pessoa.repeteSenha) {
      setConfig_textField({
        ...config_textField,
        erro_senha: true,
        variant_senha: 'filled',
        helperText_senha: "As senhas entre os campos senha e repetir senha não são iguais."
      })
      return false;
    }
    /*
     helperText_login: "O usuário ja existe. Tente outro.",
     helperText_email: "Este email já foi cadastrado, insina outro.",
    */
    return true;
  };

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
    if (dados_corretos() == false) return;

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
            error={config_textField.erro_email}
            helperText={config_textField.helperText_email}
            type="text"
            name="email"
            variant={config_textField.variant_email}
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
            error={config_textField.erro_login}
            helperText={config_textField.helperText_login}
            type="text"
            name="loginDeUsuario"
            variant={config_textField.variant_login}
            label="Login de usuário"
            margin='normal'
            onChange={handleChance}
            fullWidth
          />
          <TextField
            required
            error={config_textField.erro_senha}
            helperText={config_textField.helperText_senha}
            type="password"
            name="senha"
            variant={config_textField.variant_senha}
            label="Senha"
            margin='normal'
            onChange={handleChance}
            fullWidth
          />
          <TextField
            required
            error={config_textField.erro_senha}
            helperText={config_textField.helperText_senha}
            type="password"
            name="repeat_senha"
            variant={config_textField.variant_senha}
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
