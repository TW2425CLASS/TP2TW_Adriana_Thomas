const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = function(passport) {
  passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: 'Usuário não encontrado' });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return done(null, false, { message: 'Senha incorreta' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
