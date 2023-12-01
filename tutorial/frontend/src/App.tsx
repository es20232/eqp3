import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, TextField, Container, Grid, Paper, Typography, ThemeProvider, CssBaseline, FormLabel, List, ListItem, ListItemText } from '@mui/material';
import theme from './components/theme';
import ProdutoDaApi from './components/modulos/ProdutoDaApi';
import ProdutoParaApi from './components/modulos/ProdutoParaApi';

const App = () => {
  const URL = 'http://127.0.0.1:8000';

  const [dadosMovoProduto, setDadosNovoProduto] = useState<ProdutoParaApi>(new ProdutoParaApi(-1,'',0,null));
  const [produtoEncontrado, setProdutoEncontrado] = useState<ProdutoDaApi>(new ProdutoDaApi(-1,'',0,null));
  const [novoDadoProduto, setNovoDadoProduto] = useState<ProdutoParaApi>(new ProdutoParaApi(-1,'',0,null));
  const [listaProdutos, setListaProdutos] = useState<ProdutoDaApi[]>([]);

  const [idDeletarProduto, setIdDeletarProduto] = useState(-1);
  const [idBuscarProduto, setIdBuscarProduto] = useState(-1);
  
  const [resultadosVisiveis, setResultadosVisiveis] = useState<{buscaItem : boolean, buscaItens : boolean}>({
    buscaItem : false,
    buscaItens : false
  });

  const handleChangeCreate = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    setDadosNovoProduto((dadosAnteriores) => {
      if (name === 'imagem' && files) {
        const novoDados = new ProdutoParaApi(-1, dadosAnteriores.getNome(), dadosAnteriores.getPreco(), files[0]);
        return novoDados;
      } else if (name === 'preco') {
        const novoDados = new ProdutoParaApi(-1, dadosAnteriores.getNome(), parseFloat(value), dadosAnteriores.getImagem());
        return novoDados;
      } else {
        const novoDados = new ProdutoParaApi(-1, value, dadosAnteriores.getPreco(), dadosAnteriores.getImagem());
        return novoDados;
      }
    });
  };

  const handleSubmitCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {nome, preco, imagem} = { 
      nome: dadosMovoProduto.getNome(),
      preco : dadosMovoProduto.getPreco(),
      imagem: dadosMovoProduto.getImagem()};

    if(nome === null || nome === '') {
      alert("Adicione um nome");
      return;
    }
    if(preco === null || preco <= 0) {
      alert("Adicione um preco válido.");
      return;
    }
    if(imagem === null) {
      alert("Adicione uma imagem");
      return;
    }

    const formData = new FormData();

    formData.append('nome', nome);
    formData.append('preco', `${preco}`);
    formData.append('imagem', imagem);

    try {
      const resposta = await fetch(
        URL + '/api/produtos/', {
          method: 'POST',
          body: formData
        }
      );

      if(!resposta.ok){
        alert('Erro ao adicionar produto.');
        throw new Error(`HTTP error! status: ${resposta.status}`);
      }

      alert('Produto adicionado com sucesso.');

      setResultadosVisiveis({
        ...resultadosVisiveis,
        buscaItens : false
      });
    } catch (error) {
      console.error('Erro:', error);
    }
  }

  const handleChangeDelete = (e: ChangeEvent<HTMLInputElement>) => {
    setIdDeletarProduto(parseInt(e.target.value));
  }

  const handleDelete = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(idDeletarProduto === -1 || Number.isNaN(idDeletarProduto)){
      console.log('Informe o id');
    }

    try {
      const resposta = await fetch(URL + '/api/produtos/' + idDeletarProduto.toString() + '/', {
        method: 'DELETE',
      });

      if(!resposta.ok){
        alert('Erro ao deletar produto. Verifique se o ID do produto está correto.');
        throw new Error(`HTTP error! status: ${resposta.status}`);
      }

      alert('Produto removido com sucesso.');
      if (idDeletarProduto === novoDadoProduto.getId()){
        novoDadoProduto.reset();
        setResultadosVisiveis({
          buscaItens : false,
          buscaItem : false
        });
      }else{
        setResultadosVisiveis({
          ...resultadosVisiveis,
          buscaItens : false
        });
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setIdBuscarProduto(parseInt(e.target.value));
  }

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(idBuscarProduto === -1 || Number.isNaN(idBuscarProduto)){
      alert('Informe o ID do produto');
      return;
    }

    try {
      const resposta = await fetch(URL + '/api/produtos/' + idBuscarProduto + '/', {
        method: 'GET'
      });

      if(!resposta.ok){
        alert(`Erro ao encontrar o produto de ID ${idBuscarProduto}. Verifique se o ID do produto está correto.`);
        throw new Error(`HTTP error! status: ${resposta.status}`);
      }

      setNovoDadoProduto(new ProdutoParaApi(idBuscarProduto,'',0,null));
      const dados = await resposta.json();
      
      if (dados.length > 0) {
        const dadosDoProduto = dados[0];
        setProdutoEncontrado(
          new ProdutoDaApi(
            dadosDoProduto.id,
            dadosDoProduto.nome,
            dadosDoProduto.preco,
            dadosDoProduto.imagem)
        );

        setResultadosVisiveis({
          ...resultadosVisiveis,
          buscaItem : true
        });
      } else {
        alert(`Erro ao encontrar o produto de ID ${idBuscarProduto}. Verifique se o ID do produto está correto.`);
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleProductList = async () => {
    const resposta = await fetch(URL + '/api/produtos/',{
      method: 'GET'
    });

    if(!resposta.ok){
      alert(`Erro ao encontrar os produtos no Banco de Dados, insira algum produto e tente novamente.`);
      throw new Error(`HTTP error! status: ${resposta.status}`);
    }

    const produtosDaApi = await resposta.json();

    const produtosMapeados = produtosDaApi.map((prod: any) => new ProdutoDaApi(prod.id, prod.nome, prod.preco, prod.imagem));
    setListaProdutos(produtosMapeados);
    setResultadosVisiveis({
      ...resultadosVisiveis,
      buscaItens : true
    })
  };

  const handleChangeAtualizar = (e : ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'imagem'){
      if (e.target.files !== null) {
        const file = e.target.files[0];
        setNovoDadoProduto(() : ProdutoParaApi => {
          const novosDados = novoDadoProduto
          novosDados.setImagem(file)
          return novosDados;
        });
      }
    }else if(e.target.name === 'preco'){
      setNovoDadoProduto(() : ProdutoParaApi => {
        const novosDados = novoDadoProduto
        novosDados.setPreco(parseFloat(e.target.value));
        return novosDados;
      });
    }else{
      setNovoDadoProduto(() : ProdutoParaApi => {
        const novosDados = novoDadoProduto
        novosDados.setNome(e.target.value);
        return novosDados;
      });
    }
  };

  const handleAtualiza = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { nome, preco, imagem} = {
      nome: novoDadoProduto.getNome(),
      preco: novoDadoProduto.getPreco(),
      imagem: novoDadoProduto.getImagem()
    }
    const formData = new FormData();
    let tem_dado = false;
    if(nome !== '' && nome !== null){
      formData.append('nome', nome);
      tem_dado = true;
    }
    if(preco !== 0 && preco !== null){
      formData.append('preco', `${preco}`);
      if(!tem_dado) tem_dado = true;
    }
    if(imagem !== null){
      formData.append('imagem', imagem);
      if(!tem_dado) tem_dado = true;
    }

    if(tem_dado){
      try {
        const resposta = await fetch(
          URL + '/api/produtos/' + novoDadoProduto.getId() + '/', {
            method: 'PATCH',
            body: formData
          }
        );
  
        if(!resposta.ok){
          alert('Erro ao adicionar produto.');
          throw new Error(`HTTP error! status: ${resposta.status}`);
        }

        setResultadosVisiveis({
          buscaItens : false,
          buscaItem : false
        });

        alert('Produto atualizado com sucesso.');
      } catch (error) {
        console.error('Erro:', error);
      }
    }else{
      alert(`Preencha ao menos 1 campo para atualizar o produto de ID ${novoDadoProduto.getId()}.`)
    }
  };

  return (
    <ThemeProvider theme={theme()}>
      <CssBaseline />
      <Container style={{'padding': 20}}>
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Adicionar Produto
          </Typography>
          <form onSubmit={handleSubmitCreate}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Nome do Produto"
                  fullWidth
                  variant="outlined"
                  name="nome"
                  onChange={handleChangeCreate}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Preço do Produto"
                  fullWidth
                  variant="outlined"
                  name="preco"
                  onChange={handleChangeCreate}
                />
              </Grid>
              <Grid item xs={12}>
                <input 
                  type="file" 
                  name="imagem" 
                  onChange={handleChangeCreate} 
                />
              </Grid>
              <Grid item xs={12} style={{width: '100%'}}><Button variant="contained" color="primary" type='submit'>
                Criar
              </Button></Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
      <Container style={{'padding': 20}}>
        <Paper elevation={3} style={{ padding: '20px'}}>
          <Typography variant="h4" gutterBottom>
            Remover Produto
          </Typography>
          <form onSubmit={handleDelete}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="ID do produto"
                  fullWidth
                  variant="outlined"
                  name="id"
                  onChange={handleChangeDelete}
                />
              </Grid>
              <Grid item><Button variant="contained" color="primary" type='submit'>
                Deletar
              </Button></Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
      <Container style={{'padding': 20}}>
        <Paper elevation={3} style={{ padding: '20px'}}>
          <Typography variant="h4" gutterBottom>
            Buscar por Produto
          </Typography>
          <form onSubmit={handleSearch}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="ID do produto"
                  fullWidth
                  variant="outlined"
                  name="id"
                  onChange={handleChangeSearch}
                />
              </Grid>
              <Grid item><Button variant="contained" color="primary" type='submit'>
                Buscar
              </Button></Grid>
            </Grid>
          </form>
          {resultadosVisiveis.buscaItem && (
            <Grid>
              <Grid container spacing={3} style={{ width: '100%', marginTop: '20px' }}>
                <Grid item xs={3}>
                  <img src={URL + produtoEncontrado.getImagem()} alt={produtoEncontrado.getNome()} style={{maxWidth: '100%'}} />
                </Grid>
                <Grid item xs={9} container direction="column" justifyContent="flex-start">
                  <Grid item style={{marginTop: '20px'}}>
                    <FormLabel>Nome: {produtoEncontrado.getNome()}.</FormLabel>
                  </Grid>
                  <Grid item style={{marginTop: '10px'}}>
                    <FormLabel>Preço: {produtoEncontrado.getPreco()} reais (BR).</FormLabel>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Atualizar informações do produto
                  </Typography>
                </Grid>
                <form onSubmit={handleAtualiza}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        label="Nome do Produto"
                        fullWidth
                        variant="outlined"
                        name="nome"
                        onChange={handleChangeAtualizar}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Preço do Produto"
                        fullWidth
                        variant="outlined"
                        name="preco"
                        onChange={handleChangeAtualizar}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <input 
                        type="file" 
                        name="imagem" 
                        onChange={handleChangeAtualizar} 
                      />
                    </Grid>
                    <Grid item><Button variant="contained" color="primary" type='submit'>
                      Atualizar
                    </Button></Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          )}
        </Paper>
      </Container>
      <Container style={{'padding': 20}}>
        <Paper elevation={3} style={{ padding: '20px'}}>
          <Typography variant="h4">Lista de Produtos</Typography>
          <List>
            {resultadosVisiveis.buscaItens && listaProdutos.map((ProdutoDaApi, i) => (
              <ListItem key={i}>
                <ListItemText primary={`ID: ${ProdutoDaApi.getId()}`} secondary={`Nome: ${ProdutoDaApi.getNome()}`} />
              </ListItem>
            ))}
          </List>
          <Button variant="contained" color="primary" onClick={handleProductList}>
            Carregar Lista
          </Button>
        </Paper>
      </Container>
    </ThemeProvider>
  );
  
}
export default App;
