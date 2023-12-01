# ReactJS - Tutorial Frontend

Este é um projeto simples de gerenciamento de produtos implementado utilizando React como biblioteca principal para construção da interface do usuário. O Visual Studio Code (VSCode) foi escolhido como ambiente de desenvolvimento, proporcionando uma experiência de codificação eficiente. A estilização da aplicação foi facilitada pelo uso da biblioteca Material-UI, que oferece uma ampla variedade de componentes e estilos predefinidos.

## Funcionalidades 

A aplicação foi desenvolvida para testar as operações básicas do CRUD (Create, Read, Update, Delete) em um banco de dados por meio de uma API. As funcionalidades incluem:

- Cadastro de Produtos: Adição de novos produtos com informações como nome, descrição e preço.
- Lista informações do produto: visualizar informações de um produto usando seu ID como referência.
- Atualização de produtos: Edição das informações do produto (nome, preço e imagem).
- Exclusão de Produtos: Remoção de produtos do banco de dados.

> **Observação**
>
>O banco de dados usado para guardar as informações da API foi o Postgres
>

## Configuração do ambiente

Antes de rodar o projeto, é necessário garantir que o ambiente de desenvolvimento esteja configurado corretamente. Certifique-se de ter o seguinte instalado:
- Node.js e npm: Certifique-se de ter o Node.js instalado na sua máquina. O npm (Node Package Manager) é geralmente instalado junto. Você pode baixar o Node.js em https://nodejs.org/.
- Visual Studio Code: Este projeto foi desenvolvido no Visual Studio Code, um ambiente de desenvolvimento leve e altamente configurável. Você pode baixá-lo em https://code.visualstudio.com/.

## Rodar o projeto

Para rodar o projeto é essencial que seja seguido os seguintes passos:
1. Clonar o repositório
```git bash
git clone https://github.com/JFBatista023/Tutorial_CRUD_React.git
```

2. Estando na raíz do projeto, instalar as dependências do node e do pacote do materialUI
```console
npm install
npm install @mui/material @emotion/react @emotion/styled
```

3. Rodar o projeto
```console
npm start
```

No console será mostrado a URL a ser usada no Navegador para a visualização do projeto.