<h1 align=center> Tutorial de instalação das tecnologias e ferramentas</h1>

# Tecnologias utilizadas
<p align=center>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height=50 />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=50/>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain-wordmark.svg" height=50/>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg" height=50/>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height=50/>
</p>

# Índice

1. [Tecnologias utilizadas](#tecnologias-utilizadas)
2. [Tutorial de instalação das ferramentas no Linux](#tutorial-de-instalação-das-ferramentas-no-linux)
   1. [Instalando a IDE para o uso de Javascript](#instalando-a-ide-para-o-uso-de-javascript-no-linux)
      1. [Instalação do VsCode através do site oficial](#instalação-do-vscode-através-do-site-oficial)
      2. [Instalação do VsCode via loja de aplicativos](#instalação-do-vscode-via-loja-de-aplicativos)
   2. [Instalação do Node.js](#instalação-do-nodejs)
   3. [Instalação do Django REST e seus requisitos](#instalação-do-django-rest-e-seus-requisitos)
      1. [Instalando o Django](#instalando-o-django)
      2. [Instalando o Django REST](#instalando-o-django-rest)
   4. [Instalação do PostgreSQL](#instalação-do-postgresql)
3. [Tutorial de instalação das ferramentas no Windows](#tutorial-de-instalação-das-ferramentas-no-windows)
    1. [Instalação do Node.js](#instalação-do-nodejs)
    2. [Instalação do Django REST e seus requisitos](#instalação-do-django-rest-e-seus-requisitos)
    3. [Instalação do Python](#instalação-do-python)
    4. [Instalação do Django REST](#instalação-do-django-rest)
    5. [Instalação do PostgreSQL]()
4. [Configuração da IDE para o uso de Javascript](#configurando-ide-para-o-uso-de-javascript)
   1. [Instalação do VsCode através do site oficial](#instalação-do-vscode-através-do-site-oficial)
5. [Tutorial de uma aplicação web completa](#tutorial-de-uma-aplicação-web-completa)
    1. [Funcionamento da aplicação web](#funcionamento-da-aplicação-web)
    2. [Criando uma API REST com Django REST Framework](#criando-uma-api-rest-com-django-rest-framework)

# Tutorial de instalação das ferramentas no Linux

## Instalando a IDE para o uso de Javascript no Linux

Neste tutorial estaremos utilizando o editor de texto Visual Studio Code (VsCode) da Microsoft. Ele é um editor de texto poderoso e altamente personalizável onde através da instalação de extensões, ele facilmente se torna uma IDE para qualquer tipo de linguagem disponível. 

### Instalação do VsCode através do site oficial 

1. No Linux há diversas maneiras de se realizar a instalação, e uma delas é ir no [website oficial](https://code.visualstudio.com/download) do VsCode e realizar o download de acordo com o gerenciador de pacotes do seu sistema operacional.
    
    ![Como estamos utilizando o Ubuntu, estaremos realizando o download do .deb.](https://miask.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fec206abb-d69e-46ca-b75b-52957701e7b5%2Fac22940c-1a75-4b14-819b-c47a9699632e%2FUntitled.png?table=block&id=f9c4bbed-bf0f-4667-8082-f5da05073a2b&spaceId=ec206abb-d69e-46ca-b75b-52957701e7b5&width=2000&userId=&cache=v2)
    
    Como estamos utilizando o Ubuntu, estaremos realizando o download do .deb.
    
2. Com o arquivo descarregado, é só clicar duas vezes nele e selecionar a opção “Instalar”. Pode ser necessário a inserção da senha de admin do sistema.

### Instalação do VsCode via loja de aplicativos

Uma outra opção para realizar a instalação é utilizando a loja de aplicativos do sistema. É integrado no Ubuntu e também em diversas outras distribuições Linux, uma loja de aplicativos e por ela é possível instalar os mais diversos aplicativos de forma intuitiva, e até mesmo o VsCode.

1. No Ubuntu, iniciaremos a Ubuntu Software e procuraremos por “VsCode” ou só “code”.
    
    ![Untitled](https://miask.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fec206abb-d69e-46ca-b75b-52957701e7b5%2F108899ce-1785-4220-abfa-a30631613120%2FUntitled.png?table=block&id=5e438675-7d74-495e-ae56-d9914ff479d4&spaceId=ec206abb-d69e-46ca-b75b-52957701e7b5&width=2000&userId=&cache=v2)
    
2. Clique em instalar, e em alguns minutos a instalação estará concluída e o software pronto para ser inicializado.

## Instalação do Node.js


> 💡 Este tutorial foi capturado de https://github.com/nodesource/distributions.git  e para a realização da instalação foi utilizado o Ubuntu 22.04.3 LTS. Para mais informações de compatibilidade com sua distribuição Linux verificar README.md do repositório.


1. Primeiramente devemos fazer o download e importar o Nodesource GPG key.
    
    ```jsx
    sudo apt-get update
    sudo apt-get install -y ca-certificates curl gnupg
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
    ```
    
2. Crie um repositório deb.
    
    ```jsx
    NODE_MAJOR=20
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
    ```
    
3. Por último, realizamos um update e install.
    
    ```jsx
    sudo apt-get update
    sudo apt-get install nodejs -y
    ```
    
4. Com tudo sendo realizado de forma bem sucedida, a verificação da instalação pode ser feita usando o comando a seguir.
    
    ```jsx
    node -v
    //Também pode ser utiliziado:
    node --version
    ```
    

## Instalação do Django REST e seus requisitos

Para a instalação do Django REST temos dois requisitos:

- Python
- Django

Na maioria das distribuições Linux incluindo o Ubuntu, por padrão, já possuem o Python pré-instalado pois algumas ferramentas do sistema dependem dele para funcionarem. Mas caso sua distribuição não possua ele pré-instalado, para instalá-lo procure instruções de acordo com a sua distribuição já que o procedimento pode variar.

Se o Python estiver instalado na sua máquina, pode ser preciso ainda instalar o “pip”. Para verificar se ele já está instalado, inserimos o seguinte comando.

```jsx
python3 -m pip --version
```

Se não for exibida a versão do pip, isso quer dizer que será preciso instalá-lo. Para isso, é somente preciso digitar o comando:

```jsx
sudo apt install python3-pip
```

### Instalando o Django

1. A forma mais simples é utilizando o pip do Python, precisamos somente executar o seguinte comando no terminal.
    
    ```jsx
    python3 -m pip install Django
    ```
    

### Instalando o Django REST

1. Utilizando o pip para instalar o framework, digitaremos o seguinte comando no terminal.
    
    ```jsx
    pip install djangorestframework
    ```
    

### Instalando o PostgreSQL

1. Abra o terminal e digite o seguinte comando. Ele instalará o PostgreSQL e o pacote contrib, que fornece recursos adicionais.
    
    ```jsx
    sudo apt install postgresql postgresql-contrib
    ```
    
2. Verifique se a instalação ocorreu com sucesso.
    
    ```jsx
    sudo -u posgres psql -c "SELECT version();"
    ```

# Tutorial de instalação das ferramentas no Windows

Primeiramente devemos instalar o Node.js que consiste em um ambiente para a linguagem Javascript, com ele é possível desenvolver tanto o frontend quanto o backend. Ele será necessário para o uso da biblioteca React.

## Instalação do Node.js
>Este tutorial foi feito apartir do windows 10 mas serve para qualquer sistema operacional da microsoft. Faremos o download do executável no link, selecionaremos a versão 20.9.0 LTS, própria para Windows.
1. Primeiramente devemos fazer o download e inicializar o arquivo executável.
2. Selecione “next”, logo após aceite os termos e selecione “next” novamente.
<p align=center>
    <img src="https://abaft-faucet-00f.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fc6786318-d141-43c3-a77e-12749fec8bee%2Fe8f1674e-b013-4dde-8b8d-27b3a9600b38%2FUntitled.png?table=block&id=d5a1c662-f7aa-4185-807a-b1c2865a59d6&spaceId=c6786318-d141-43c3-a77e-12749fec8bee&width=990&userId=&cache=v2" heigth=500 width=500/>
</p>

3. Posteriormente selecione novamente “next” na escolha do diretório e “next” na customização de setup. 
<p align=center>
    <img src="https://abaft-faucet-00f.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fc6786318-d141-43c3-a77e-12749fec8bee%2F01f59470-224b-4cc7-9e27-82c2de57af3d%2FUntitled.png?table=block&id=835997e4-915f-4771-ac60-976099deefc7&spaceId=c6786318-d141-43c3-a77e-12749fec8bee&width=990&userId=&cache=v2" heigth=500 width=500/>
</p>

4. Por fim Selecione novamente “next” e “install”. Após isso o Node estará instalado no seu dispositivo.
<p align=center>
    <img src="https://abaft-faucet-00f.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fc6786318-d141-43c3-a77e-12749fec8bee%2F9d0d3776-ba3c-4384-a84f-d1656d4df562%2FUntitled.png?table=block&id=0596f230-c867-48d3-adde-7abcf8a0dc21&spaceId=c6786318-d141-43c3-a77e-12749fec8bee&width=990&userId=&cache=v2" heigth=500 width=500/>
</p>

5.  Para verificar se a instalação foi concluída com sucesso use o seguinte comando no terminal.
`````
node --version
`````
## Instalação do Django REST e seus requisitos

Para a instalação do Django REST temos dois requisitos:

- Python
- Django

Primeiramente iremos Instalar o Python para posteriormente ser instalado o Django.

## Instalando o Python

1. Acesse o site do [Python](https://www.python.org/downloads/windows/), e selecione a versão mais atualizada de acordo com a arquitetura da sua máquina.
2. Após fazer o download execute o arquivo, aceite as duas caixas de seleção e aperte em “customize installation”.
<p align=center>
    <img src="https://abaft-faucet-00f.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fc6786318-d141-43c3-a77e-12749fec8bee%2F80ec6231-87bd-40bf-a0d5-6c26dd86ff49%2FUntitled.png?table=block&id=08d536f9-424f-4a56-b7d2-a90618cce50a&spaceId=c6786318-d141-43c3-a77e-12749fec8bee&width=860&userId=&cache=v2" heigth=500 width=500/>
</p>
3. Aceite todas as caixas de seleção e aperte em “next”, na tela seguinte aceite novamente todas as caixas de seleção e aperte em “install”. Após isso o Python estará instalado em seu dispositivo
<p align=center>
    <img src="https://abaft-faucet-00f.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fc6786318-d141-43c3-a77e-12749fec8bee%2F7e56f9d5-ce5d-412a-9b95-66d2c5310d86%2FUntitled.png?table=block&id=d16ffa21-4c85-4b97-af16-568849b51ee5&spaceId=c6786318-d141-43c3-a77e-12749fec8bee&width=1300&userId=&cache=v2" heigth=500 width=500/>
</p>
4. Para verificar se a instalação foi efetuada com sucesso utilize o seguinte comando no terminal.

`````
python --version
`````
### Instalando o Django REST

1. Utilizando o pip para instalar o framework, digitaremos o seguinte comando no terminal.
    
    ```
    pip install django
    ```
    

## Configurando IDE para o uso de Javascript

Neste tutorial estaremos utilizando o editor de texto Visual Studio Code (VsCode) da Microsoft. Ele é um editor de texto poderoso e altamente personalizável onde através da instalação de extensões, ele facilmente se torna uma IDE para qualquer tipo de linguagem disponível. 

### Instalação do VsCode através do site oficial

1. A instalação do Vscode no Windows não difere muito da realizada na [seção 1.1.1](#configurando-ide-para-o-uso-de-javascript) deste documento, a única diferença notável é que faremos o download do instalador para o Windows.

2. Com o arquivo descarregado, é só clicar duas vezes nele e selecionar a opção “Instalar”.

3. Aceite os termos, e siga a instalação de acordo com as figuras mostradas, sempre clicando em próximo. Na última figura marque todas as caixas de seleção e prossiga com a instalação.
<p align=center>
    <img src="https://abaft-faucet-00f.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fc6786318-d141-43c3-a77e-12749fec8bee%2F134aaa01-586d-4fba-9180-034ff18322da%2FUntitled.png?table=block&id=26620d7a-0b1b-4290-8dae-7b7494c470af&spaceId=c6786318-d141-43c3-a77e-12749fec8bee&width=1180&userId=&cache=v2" heigth=500 width=500/>
</p>

4. Após prosseguir corretamente as etapas anteriores, clique em “instalar” e assim o VSCODE estará devidamente instalado em sua máquina.
<p align=center>
    <img src="https://abaft-faucet-00f.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fc6786318-d141-43c3-a77e-12749fec8bee%2F5cb17331-689b-4b25-b812-85ac6210692b%2FUntitled.png?table=block&id=3d5abef5-a93b-4b7a-b4c1-18d696127c8c&spaceId=c6786318-d141-43c3-a77e-12749fec8bee&width=860&userId=&cache=v2" heigth=500 width=500/>
</p>

# Tutorial de uma aplicação web completa
## Funcionamento da aplicação web
Iremos agora desenvolver uma aplicação completa de gerenciamento de produtos com as tecnologias apresentadas anteriormente. Através do consumo de endpoints definidos na API, é possível:
Listar todos os produtos: obter uma visão geral de todos os produtos disponíveis no sistema.

- Criar um novo produto: adicionar novos itens ao banco de dados. Ao enviar os detalhes do produto, como nome, preço e imagem, é possível criar registros para novos produtos de forma simples e direta.

- Obter detalhes de um produto específico: oferece a capacidade de visualizar informações detalhadas sobre um único produto, com base em um ID único associado a cada item.

- Atualizar um produto existente: ao enviar todas as informações atualizadas do produto, é possível modificar completamente os detalhes de um produto específico.

- Deletar um produto: remover um produto específico do banco de dados com base em seu ID.

## Criando uma API REST com Django REST Framework
>O projeto completo da API está disponível no [github](https://github.com/JFBatista023/Tutorial_CRUD_Django).

### Criação do projeto
Antes de começar os passos, crie um diretório para o projeto e navegue até ele no terminal. Irei usar o diretório com o nome “backend”.
Crie e ative um ambiente virtual para organizar as dependências do projeto:

**Use o comando para criar o ambiente:** 
- No Windows: ````python -m venv env````
- No Linux: ````python3 -m venv env````

**Agora ative o ambiente:**
- No Windows: env\Scripts\activate
- No Linux: source env/bin/activate

**Instale e crie um projeto Django:**
- Instale o Django: ````pip install django````
- Crie um novo projeto “produtos”: ````django-admin startproject produtos````
- Crie um novo app “api”: ````python manage.py startapp api````

**Instale o Django REST Framework:**
- Use o comando: ````pip install djangorestframework````

**Cadastre o app e o Django REST:**
- Acesse o arquivo settings.py
- Localize a lista ````INSTALLED_APPS```` e insira o nome do app e o Django REST

### Configurando o banco de dados
Para utilizar o PostgreSQL deve-se instalar a dependência que o Django utiliza e depois configurar o acesso ao banco de dados na settings.py.
Instale a dependência via o comando: ````pip install psycopg2-binary````
, localize o dicionário ````DATABASE```` e modifique os dados de acordo com a configuração do seu banco de dados:

### Criando o model
Agora vamos criar o model do Produto para que seja adicionado ao banco de dados e possamos realizar o CRUD e navegue até o arquivo models.py. No arquivo, insira o código do model Produto com seus atributos:

Instalar a dependência de manipulação de imagem: 
````
pip install Pillow
````
### Criando migrations
Para que o model seja adicionado no banco de dados, devemos realizar as migrations.
Gerar o código SQL das migrations via comando: 
````
python manage.py makemigrations
````
Executar as migrations via comando: 
````
python manage.py migrate
````

### Criando serializer
Devemos criar agora um serializer para que o objeto Produto possa ser serializado em um JSON, por exemplo. Crie um arquivo serializers.py no diretório do seu app (no meu caso, api/serializers.py):

Crie o serializer para o model Produto:

### Criando os endpoints
Vamos criar os endpoints que irão ser consumidos nas requisições do frontend.
1. Acesse o arquivo views.py

2. Crie os endpoints de ````GET````, ````POST````, ````PATCH```` e ````DELETE```` (Insira o código que está disponível no github)

### Criando as urls
Para que seja possível consumir os endpoints criados na views, devemos associá-los a urls.

1. Crie o arquivo ````urls.py```` no diretório do seu app
2. Crie as urls
3. Localize o arquivo ````urls.py```` do projeto:
4. Adicione as urls do app:


### Configurando o CORS
Após configurar as urls, precisamos configurar o CORS da aplicação para que seja possível consumir os endpoints por outras aplicações.

1. Instale a dependência necessária via comando: ````pip install django-cors-headers````
2. Adicione a dependência do CORS na lista ````INSTALLED_APPS```` no arquivo ````settings.py````
3. Adicione o seguinte código no arquivo settings.py:
4. Localize a lista ````MIDDLEWARE```` e adicione o middleware do CORS:

**OBS: O "corsheaders.middleware.CorsMiddleware” deve ficar acima do "django.middleware.common.CommonMiddleware".**

### Rodando o servidor
Para iniciar o servidor, devemos executar o comando: ````python manage.py runserver````

### Realizando requisições
Com o servidor rodando, iremos realizar requisições para testar cada endpoint da aplicação. Para isso, usaremos a ferramenta HTTPIE nesse tutorial. Com essa ferramenta, podemos testar os endpoints da API sem ter um frontend.

1. ````POST /api/produtos/````
    - Vamos adicionar 2 produtos como teste

2. ````GET /api/produtos````


3. ````GET /api/produtos/1````

4. ````PATCH /api/produtos/````
    - Aqui podemos notar que o url do atributo produto mudou.

5. ````DELETE /api/produtos/2````
    - Como é uma requisição de DELETE, ele envia apenas o Http Status Code 204


Se fizermos o ````GET /api/produtos```` novamente, podemos verificar que o item 2 não está mais presente na resposta do servidor.


**OBS: Ao fazer as requisições POST e PATCH, por estar fazendo um upload de arquivo, deve-se mudar o formato da requisição para multipart/form-data.**
