const axios = require('axios');
require('dotenv').config();

const TMDB_KEY = process.env.TMDB_KEY;

const mashupSearch = async (term) => {
  try {
    // 1. Buscar filme no TMDB
    const movieSearchUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(term)}&api_key=${TMDB_KEY}`;
    const movieRes = await axios.get(movieSearchUrl);

    if (!movieRes.data.results.length) {
      return { error: 'Filme não encontrado.' };
    }

    const movie = movieRes.data.results[0];
    const movieId = movie.id;

    // 2. Buscar elenco do filme
    const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_KEY}`;
    const creditsRes = await axios.get(creditsUrl);

    const mainActor = creditsRes.data.cast[0];

    // 3. Buscar bio do ator principal na Wikipedia PT
    let actorBio = 'Biografia não disponível.';
    let actorImage = '';

    if (mainActor) {
      const actorNameWiki = mainActor.name.replace(/ /g, '_');
      try {
        const wikiUrl = `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(actorNameWiki)}`;
        const wikiRes = await axios.get(wikiUrl);
        actorBio = wikiRes.data.extract || actorBio;
        actorImage = wikiRes.data.thumbnail?.source || '';
      } catch {
        // Se a Wikipedia não tiver o ator, mantém bio padrão
      }
    }

    // 4. Retornar resultado formatado
    return {
      filme: movie.title,
      poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
      ator_principal: mainActor ? mainActor.name : 'Desconhecido',
      ator_foto: mainActor && mainActor.profile_path ? `https://image.tmdb.org/t/p/w200${mainActor.profile_path}` : actorImage,
      ator_bio: actorBio
    };

  } catch (err) {
    console.error('Erro na mashupSearch:', err.message);
    return { error: 'Erro ao buscar dados.' };
  }
};

module.exports = mashupSearch;
