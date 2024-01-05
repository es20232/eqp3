# Configuração React

Este é o README para o seu projeto React. Aqui estão algumas instruções para configurar o ambiente de desenvolvimento e configurar o Visual Studio Code para formatação automática e organização de imports.

## Instalação do PNPM (caso não esteja instalado)

Se o PNPM não estiver instalado na sua máquina, você pode instalá-lo seguindo as instruções na [documentação oficial do PNPM](https://pnpm.io/installation).

## Baixando Dependências

Após a instalação do PNPM, você pode baixar as dependências do seu projeto React executando o seguinte comando no terminal:

```bash
pnpm install
```

Isso instalará todas as dependências listadas no arquivo `package.json`.

## Configuração do Visual Studio Code

Para configurar o Visual Studio Code para formatação automática e organização de imports ao salvar um arquivo, siga estes passos:

1. Abra o VS Code.
2. Acesse as configurações (Settings) ou abra o arquivo `settings.json` do seu projeto.
3. Adicione ou atualize as seguintes configurações no arquivo `settings.json`:

```json
{
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true,
        "source.organizeImports": true
    }
}
```

Isso configurará o VS Code para formatar automaticamente seu código ao salvar o arquivo, além de executar o ESLint para corrigir possíveis erros e organizar os imports.
