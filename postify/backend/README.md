# Configuração Django

Este é o README para o seu projeto Django. Aqui estão algumas instruções para configurar o ambiente de desenvolvimento e instalar as dependências necessárias.

## Configuração do Ambiente

### Criando um Virtual Environment (Ambiente Virtual)

Recomendamos o uso de ambientes virtuais para isolar as dependências do seu projeto. Para criar um ambiente virtual, execute o seguinte comando no terminal:

```bash
python -m venv env
```

### Ativando o Ambiente Virtual

- No Windows:

```bash
env\Scripts\activate
```

- No macOS e Linux:

```bash
source env/bin/activate
```

## Instalando Dependências

Certifique-se de estar no ambiente virtual e execute o seguinte comando para instalar todas as dependências listadas no arquivo `requirements.txt`:

```bash
pip install -r requirements.txt
```
## Criando um Arquivo `.env`

Copie o arquivo `.env-example` para um novo arquivo chamado `.env` e preencha com suas próprias variáveis de ambiente.

## Realizando migrations

```bash
python manage.py makemigrations
python manage.py migrate
```