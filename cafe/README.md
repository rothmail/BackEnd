
# ☕ Coffee API + Front-End

Projeto fullstack simples para cadastro, login de usuários e gerenciamento de cafés com Node.js, Express, TypeORM e MySQL no backend, e HTML/CSS/JS no frontend.

---

## ✅ Pré-requisitos

- Node.js instalado
- MySQL em execução
- `npm` ou `yarn`
- Criar um banco de dados MySQL chamado `cafe` ou outro nome e configurar o arquivo `.env`

---

## ⚙️ Configuração do Projeto

1. **Clone o projeto**:
   ```bash
   git clone <seu-repositorio>
   cd <pasta-do-projeto>
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure o arquivo `.env`** (já fornecido):
   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=root
   DB_NAME=cafe
   ```

4. **Rode a aplicação**:
   ```bash
   npx ts-node-dev src/server.ts
   ```

   Ou, se você estiver usando script no `package.json`:
   ```bash
   npm run dev
   ```

   O servidor será iniciado em: `http://localhost:3000`

---

## 🗃️ Rotas da API

### Usuários (`/api/users`)
- `POST /api/users`: Cadastrar novo usuário
- `POST /api/usersLogin`: Login de usuário
- `GET /api/users`: Listar todos
- `GET /api/users/:id`: Buscar por ID
- `PUT /api/users/:id`: Atualizar
- `DELETE /api/users/:id`: Deletar

### Cafés (`/coffee`)
- `POST /coffee`: Cadastrar café
- `GET /coffee`: Listar cafés
- `GET /coffee/:id`: Buscar café por ID
- `PUT /coffee/:id`: Atualizar café
- `DELETE /coffee/:id`: Deletar café

---

## 💻 Testando no navegador

1. **Abra o arquivo `entrar.html`** no navegador (`./entrar.html`)
2. Faça login ou vá para o cadastro (`cadastrar.html`)
3. Após o login, você será redirecionado para `telaPrincipal.html`, onde poderá:
   - Cadastrar, buscar, editar e deletar cafés
   - Listar todos os cafés
4. O front consome a API diretamente via `fetch` (`script.js`, `coffes.js`)

> ⚠️ Certifique-se de que o backend está rodando antes de testar o frontend.

---

## 📂 Estrutura de Pastas

```
.
├── src
│   ├── controller
│   ├── models
│   ├── routes
│   ├── database
│   └── server.ts
├── public
│   ├── entrar.html
│   ├── cadastrar.html
│   ├── telaPrincipal.html
│   ├── js
│   │   ├── script.js
│   │   └── coffes.js
│   ├── css
│   │   └── style.css
│   └── img
│       ├── coffee-image.jpg
│       └── logo-coffee.png
└── .env
```

---

## 🧪 Testes Manuais

Use ferramentas como [Postman](https://www.postman.com/) ou o frontend incluso para testar as rotas da API.

---
