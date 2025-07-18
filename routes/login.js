const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect('/?erro=credenciais-invalidas');

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect('/search-page');
    });
  })(req, res, next);
});

router.get('/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
    res.sendStatus(200); // Está logado
  } else {
    res.sendStatus(401); // Não está logado
  }
});

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});



module.exports = router;
    