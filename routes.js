const Index = require('./controllers/index');
const TopTen = require('./controllers/topten');
const Search = require('./controllers/search');

class Routes {
  static setup(app) {
    // Just to check if it's alive.
    app.get('/', Index.show);

    // GET REQUESTS
    app.get('/top10', TopTen.getTop);
    app.get('/search/:movieTitle', Search.byTitle);

    // POST REQUESTS
  }
}

module.exports = Routes;
