const express = require('express');
const router = express.Router();
const Search = require('../models/Search');
const { ensureAuthenticated } = require('../auth/auth'); 

// Rota para pesquisar filmes
router.post('/', ensureAuthenticated, async (req, res) => {
  try {
    const { term } = req.body;

    const result = await mashupSearch(term);
    if (result.error) return res.status(404).json(result);

    // Salva a pesquisa no banco (opcional)
    await Search.create({
      term,
      user: req.user._id
    });

    res.json(result);
  } catch (err) {
    console.error('Erro na rota /search:', err.message);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

module.exports = router;
