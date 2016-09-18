const superagent = require('superagent');
const config = require('../config');
const MovieSearch = require('../models/movieTitle');


class Search {

  static byTitle(req, res) {
    const movie = new MovieSearch(req);

    superagent.get(`${config.MOVIE_DB.BASE_URL}/3/search/movie?api_key=${config.MOVIE_DB.KEY}&session_id=1&language=en-US&query=${movie.title}&sort_by=created_at.asc`)
      .then((response) => {
        movie.movies = response.body;
        res.send(movie.movies);
      }, (err) => {
        console.log(err);
        res.send(err);
      });
  }

}

module.exports = Search;
