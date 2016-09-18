const superagent = require('superagent');
const request = require('request');
const config = require('../config');
const MovieSearch = require('../models/movieTitle');

const TEMP_DATA = {
  body: { 'id': '296524', 'title': 'Deepwater Horizon', 'runtime': 0, 'budget': 156000000, 'popularity': 3.777997, 'vote_average': 3.6, 'genre': [{ 'id': 18, 'name': 'Drama' }], 'cast': [{ 'cast_id': 0, 'character': 'Mike Williams', 'credit_id': '54d9f974c3a3687ab20015d8', 'id': 13240, 'name': 'Mark Wahlberg', 'order': 0, 'profile_path': '/z2wJh5n7qZRUE1y9uB8UrivAV2b.jpg' }, { 'cast_id': 8, 'character': 'Caleb Holloway', 'credit_id': '555a3063c3a368777200ca18', 'id': 527393, 'name': "Dylan O'Brien", 'order': 1, 'profile_path': '/6u7aDtMnAGaRjOGWgjMIrNNr0rp.jpg' }, { 'cast_id': 6, 'character': 'Felicita Williams', 'credit_id': '554d6415c3a36824cd002d0f', 'id': 11661, 'name': 'Kate Hudson', 'order': 2, 'profile_path': '/l2bTPlxr2AGUZrrgxfYDMHF8VUk.jpg' }, { 'cast_id': 7, 'character': 'Jimmy Harrell', 'credit_id': '554d6433925141402a002ea0', 'id': 6856, 'name': 'Kurt Russell', 'order': 3, 'profile_path': '/rlnFuNkisPpuypARI7QaGCmOY6V.jpg' }, { 'cast_id': 9, 'character': 'Vidrine', 'credit_id': '57478cb9c3a3686bc10001d9', 'id': 6949, 'name': 'John Malkovich', 'order': 4, 'profile_path': '/j3KJURh51bOLb4WNqx4eGAbePV7.jpg' }, { 'cast_id': 5, 'character': 'Andrea Fleytas', 'credit_id': '55219b64c3a3683453001a13', 'id': 180486, 'name': 'Gina Rodriguez', 'order': 5, 'profile_path': '/ugRQda9aVoTW0YqWLxQg7bw5s4G.jpg' }, { 'cast_id': 13, 'character': 'Robert Kaluza', 'credit_id': '57478cba92514135cf000200', 'id': 60677, 'name': 'Brad Leland', 'order': 6, 'profile_path': '/gIXb73WT2fyoCChUyJgjcThqaA1.jpg' }, { 'cast_id': 12, 'character': 'Dewey Revette', 'credit_id': '57478cb9c3a3686ba000020c', 'id': 129868, 'name': 'J.D. Evermore', 'order': 7, 'profile_path': '/iNn9JV3Kk7VJ9ICYKdjgwFq8EpF.jpg' }, { 'cast_id': 10, 'character': 'Jason Anderson', 'credit_id': '57478cb9c3a3686bb60001ba', 'id': 824, 'name': 'Ethan Suplee', 'order': 8, 'profile_path': '/tdfUFBwYm9rjwD2YtVl9LYoyoE2.jpg' }, { 'cast_id': 11, 'character': 'Passengers', 'credit_id': '57478cb992514136960001c9', 'id': 1560335, 'name': 'Sue-Lynn Ansari', 'order': 9, 'profile_path': null }, { 'cast_id': 14, 'character': 'Landry', 'credit_id': '57478cba92514135cb000217', 'id': 60881, 'name': 'Douglas M. Griffin', 'order': 10, 'profile_path': '/5QTBIsyxZRo21uYGtpGBxvkz6cB.jpg' }, { 'cast_id': 15, 'character': 'David Sims', 'credit_id': '57478cbac3a3686bc10001db', 'id': 141762, 'name': 'Joe Chrest', 'order': 11, 'profile_path': '/fVaVq1UetdXuWyCHeiLsi0704Qg.jpg' }, { 'cast_id': 16, 'character': "Patrick O'Bryan", 'credit_id': '57478cbbc3a3686ba000020e', 'id': 97446, 'name': 'James DuMont', 'order': 12, 'profile_path': '/A448koSIESyi91EmOrCJwIC2wDA.jpg' }, { 'cast_id': 17, 'character': 'Coast Guard Commander', 'credit_id': '57478cbb925141367b0001cf', 'id': 76544, 'name': 'Chris Ashworth', 'order': 13, 'profile_path': '/rt52xrN4ewHdMp5kmOaZUdzrN3u.jpg' }] },
};

class Search {

  static byTitle(req, res) {
    console.log(req);
    const movie = new MovieSearch(req);

    console.log(movie);

    console.log(JSON.stringify(movie.mlSearch));

    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    // res.setHeader('Access-Control-Allow-Origin', '*');
    // // res.set('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // // Request methods you wish to allow
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    request({
      url: `${config.ML_SERVER.BASE_URL}/workspaces/8e9dafeced474449bcffe877931cd231/services/ad14949ab58c4888b14fbe15769b9c9d/execute?api-version=2.0&details=true`, // URL to hit
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Custom-Header': '1024',
        'Authorization': `Bearer ${config.ML_SERVER.KEY}`,
      },
      json: true,
      body: movie.mlSearch,
    },
      function (err, response, body) {
        if (err) {
          console.log(err);
          res.send(err);
          return;
        }
        
        let data = response.body;

        if (data && data.Results && data.Results.output1 && data.Results.output1.value && data.Results.output1.value.Values) {
          res.send(data.Results.output1.value.Values[0]);
          return;
        } else {
          res.send(response);
          return;
        }
      });
  }

}

module.exports = Search;
