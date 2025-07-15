# 🔐 Sistema de Autenticação com Node.js, Express e MongoDB

## 👥 Elementos do Grupo

- Thomás Urich — Nº 31267
- Adriana Rodrigues — Nº 31476
> Repositório privado criado via GitHub Classroom com acesso ao utilizador **pedromoreira-estg**

---

## 🚀 Tecnologias Utilizadas

- **Node.js**  
- **Express.js**  
- **MongoDB + Mongoose**  
- **Passport.js (estratégia local)**  
- **bcrypt** (hash de senhas)  
- **dotenv** (variáveis de ambiente)  
- **connect-flash** (mensagens flash)

---

## 🛠️ Instalação e Configuração

### 1. Clonar o Projeto

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Criar o Arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
MONGO_URI=mongodb://localhost:27017/sua-base-dados
SESSION_SECRET=umSegredoQualquerAqui
```

---

## ⚙️ Comandos para Rodar a Aplicação Localmente

```bash
npm install     # instala as dependências
npm start       # inicia o servidor (porta 3000 por padrão)
```

A aplicação ficará disponível em:  
🔗 [http://localhost:3000](http://localhost:3000)

---

## 🌍 Deployment Online

A aplicação está disponível online via [Render.com](https://render.com):

🔗 **https://nome-da-sua-app.onrender.com**

---

## 📁 Estrutura do Projeto

```
📦 projeto/
├── public/               # Páginas HTML estáticas (login.html, register.html, home.html)
├── routes/
│   ├── authRoutes.js     # Login, logout e registro
│   └── protectedRoutes.js
├── models/
│   └── User.js           # Modelo de usuário com Mongoose
├── auth/
│   └── auth.js           # Configuração do Passport.js
├── .env
├── package.json
├── server.js             # Arquivo principal do servidor
└── README.md
```

---

## 📌 Notas

- A autenticação protege a página `/search` com middleware.
- O formulário `/login` redireciona com mensagens de erro ou sucesso via query string.
- Senhas são armazenadas com hash (`bcrypt`).
- O `express.static` serve os arquivos HTML diretamente da pasta `public/`.

---

## 📎 Entrega

- ✅ **README.md** incluído com todas as instruções e identificação.
- ✅ **Ficheiro ZIP** com o código-fonte enviado.
- ✅ **Link do repositório GitHub** privado com acesso ao utilizador **pedromoreira-estg**.
- ✅ **Link do deployment online (Render.com ou equivalente)** incluído.

---