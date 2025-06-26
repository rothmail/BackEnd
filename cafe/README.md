# ☕ Sistema de Cadastro de Cafés

Este é um projeto backend desenvolvido em **Node.js + TypeScript**, com uma estrutura organizada em **MVC**. Ele fornece um sistema simples de cadastro e autenticação de usuários, além de funcionalidades para listar e cadastrar cafés.

## 📁 Estrutura do Projeto

```
cafe/
├── node_modules/
├── public/
│   ├── css/
│   │   └── style.css
│   ├── img/
│   ├── js/
│   │   ├── coffes.js
│   │   └── script.js
│   ├── cadastrar.html
│   ├── entrar.html
│   └── telaPrincipal.html
├── src/
│   ├── controller/
│   ├── database/
│   ├── models/
│   ├── routes/
│   └── server.ts
├── .env
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## 🚀 Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- SQLite (ou outro sistema de banco de dados leve)
- HTML/CSS/JavaScript Vanilla

## 📌 Funcionalidades

- Cadastro de usuário
- Autenticação de usuário
- Cadastro de cafés
- Listagem de cafés
- Interface básica para interação via navegador

## 📂 Frontend (public/)

Os arquivos estáticos estão na pasta `public/`:

- `cadastrar.html`: página de cadastro de usuários.
- `entrar.html`: página de login.
- `telaPrincipal.html`: interface principal após o login.
- `js/`: scripts de interação.
- `css/style.css`: estilos da aplicação.

## 📦 Backend (src/)

O backend está estruturado em:

- `controller/`: lógica de controle de usuários e cafés.
- `database/`: conexão e inicialização do banco de dados.
- `models/`: definição dos modelos do banco.
- `routes/`: rotas da aplicação.
- `server.ts`: ponto de entrada da aplicação.

## 🔧 Como Rodar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/rothmail/BackEnd.git
cd BackEnd/cafe
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` com as informações necessárias, como a URL do banco de dados, porta, etc.

```env
PORT=3000
DATABASE_URL=./src/database/database.sqlite
```

### 4. Rodar a aplicação

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`.

## 📄 Licença

Este projeto está licenciado sob os termos da licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

Projeto criado para fins de aprendizado e prática de backend com TypeScript e Express.
