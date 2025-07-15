const express = require('express');
const router = express.Router();
const fetch = require('node-fetch'); // npm install node-fetch@2
const isAuth = require('./isAuth');
const Search = require('../models/Search');

const TMDB_KEY = process.env.TMDB_KEY;

router.post('/search', isAuth, async (req, res) => {
  const term = req.body.term;
  console.log('🔍 Termo recebido:', term);

  try {
    // Buscar filme
    const movieSearch = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(term)}&api_key=${TMDB_KEY}`);
    const movieData = await movieSearch.json();

    if (!movieData.results.length) {
      return res.status(404).json({ error: 'Filme não encontrado.' });
    }

    const movie = movieData.results[0];
    const movieId = movie.id;

    // Buscar elenco
    const creditsRes = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_KEY}`);
    const creditsData = await creditsRes.json();
    const mainActor = creditsData.cast[0];

    // Buscar resumo da Wikipedia pelo nome do ator principal
    let actorBio = 'Biografia não disponível.';
    let actorImage = '';

    if (mainActor) {
      const actorNameWiki = mainActor.name.replace(/ /g, '_');
      const wikiRes = await fetch(`https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(actorNameWiki)}`);
      if (wikiRes.ok) {
        const wikiData = await wikiRes.json();
        actorBio = wikiData.extract || actorBio;
        actorImage = wikiData.thumbnail?.source || '';
      }
    }

    // Salvar pesquisa no banco
    await Search.create({
      term,
      user: req.user._id
    });

    // Responder com dados
    res.json({
      filme: movie.title,
      poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
      ator_principal: mainActor ? mainActor.name : 'Desconhecido',
      ator_foto: mainActor && mainActor.profile_path ? `https://image.tmdb.org/t/p/w200${mainActor.profile_path}` : actorImage,
      ator_bio: actorBio
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar dados.' });
  }
});

module.exports = router;
