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

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', require('./routes/authRoutes'));
app.use('/', require('./routes/protectedRoutes'));

// Rota GET para servir a página de pesquisa protegida
app.get('/search', isAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/', (req, res) => {
  res.redirect('/login.html');
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/public/register.html");
});


app.listen(3000, () => console.log('Servidor a correr em http://localhost:3000'));
