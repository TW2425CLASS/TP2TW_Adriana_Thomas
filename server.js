require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path');
const isAuth = require('./routes/isAuth');
require('./auth/auth');

const app = express();

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Sessão e autenticação
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Rotas
app.use('/', require('./routes/authRoutes'));
app.use('/', require('./routes/protectedRoutes'));

// Rota protegida
app.get('/search', isAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Redirecionamento padrão
app.get('/', (req, res) => {
  res.redirect('/login.html');
});

// Corrigir erro em /login ou /register
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// (opcional) Garantir que /login.html funcione diretamente
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.listen(3000, () => console.log('Servidor a correr em http://localhost:3000'));
