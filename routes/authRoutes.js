const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Ajuste o caminho conforme necessário

// POST /login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.redirect('/login.html?erro=credenciais-invalidas');
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect('/search'); // redireciona para a página protegida
    });
  })(req, res, next);
});

// POST /register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.redirect('/register.html?erro=usuario-existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.redirect('/login.html?mensagem=registo-sucesso');
  } catch (err) {
    console.error(err);
    res.redirect('/register.html?erro=erro-servidor');
  }
});

// GET /logout
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/login.html');
  });
});

// ✅ GET /check-auth (verifica se o usuário está logado)
router.get('/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
    return res.sendStatus(200); // Está logado
  } else {
    return res.sendStatus(401); // Não está logado
  }
});

module.exports = router;
