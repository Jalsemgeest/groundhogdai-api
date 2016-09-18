
class MovieSearch {
  constructor(data) {
    this.TITLE = data.params.movieTitle;
    this.MOVIES = [];
  }

  get title() {
    return this.TITLE;
  }

  get movies() {
    return JSON.stringify(this.MOVIES);
  }

  set movies(data) {
    for (const movie of data.results) {
      this.MOVIES.push({ title: movie.title, id: movie.id });
    }
  }
}

module.exports = MovieSearch;
