module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  if (req.headers.accept?.includes('application/json')) {
    return res.status(401).json({ error: 'Não autenticado' });
  }

  res.redirect('/login.html');
};
