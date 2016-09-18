
class TopTen {
  constructor(data) {
    let topMovies = null;
    try {
      topMovies = JSON.parse(data.body);
    } catch (e) { topMovies = data.body; }

    this.MOVIES = [];

    let counter = 0;
    for (const movie of topMovies.results) {
      this.MOVIES.push({ title: movie.original_title, revenue: 100000 + counter, releaseDate: movie.release_date });
      counter++;
    }
  }

  get response() {
    return JSON.stringify(this.MOVIES);
  }
}

module.exports = TopTen;
