require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const flash = require('connect-flash');

const app = express();

const searchRoutes = require('./routes/search');


const isAuth = require('./routes/isAuth');
require('./auth/auth');

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB conectado'))
.catch(err => console.error('❌ Erro ao conectar ao MongoDB:', err));

// Middlewares de parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Sessão (essencial para manter login)
app.use(session({
  secret: process.env.SESSION_SECRET || 'segredo-padrao',
  resave: false,
  saveUninitialized: false
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Flash messages (opcional)
app.use(flash());

// Servir arquivos estáticos (ex: style.css, HTML)
app.use(express.static(path.join(__dirname, 'public')));

// Rotas de autenticação e rotas protegidas
app.use('/', require('./routes/authRoutes'));
app.use('/', require('./routes/protectedRoutes'));

// Rota protegida que carrega a página principal (home.html)
app.get('/search', isAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Redireciona para login por padrão
app.get('/', (req, res) => {
  res.redirect('/login.html');
});

// Garantir que login e register funcionem mesmo acessando /login ou /register
app.get(['/login', '/login.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get(['/register', '/register.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.use('/search', searchRoutes);

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));
