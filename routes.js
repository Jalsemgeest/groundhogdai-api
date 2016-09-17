const Index = require('./controllers/index');
const TopTen = require('./controllers/topten');

class Routes {
  static setup(app) {
    // Just to check if it's alive.
    app.get('/', Index.show);

    // GET REQUESTS
    app.get('/top10', TopTen.getTop);

    // POST REQUESTS

  }
}

module.exports = Routes;
