const superagent = require('superagent');
const config = require('../config');
const TopTenModel = require('../models/topTen');

class TopTen {

  static getTop(req, res) {
    // console.log(`${config.MOVIE_DB.BASE_URL}/3/movie/upcoming?api_key=${config.MOVIE_DB.KEY}`);
    superagent.get(`${config.MOVIE_DB.BASE_URL}/3/movie/upcoming?api_key=${config.MOVIE_DB.KEY}`)
    .then(response => {
      const topTen = new TopTenModel(response);
      res.send(topTen.response);
    }, (err) => {
      console.log(err);
    });
  }
}

module.exports = TopTen;
