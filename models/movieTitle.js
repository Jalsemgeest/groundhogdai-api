
class MovieSearch {
  constructor(data) {
    console.log(data.body);
    this.TITLE = data.body.title;
    this.ID = data.body.id;
    this.BUDGET = data.body.budget;
    this.POPULARITY = data.body.popularity;
    this.VOTE_AVG = data.body.vote_average;
    this.GENRE = data.body.genre.map((entry) => entry.name).join(" | ");
    this.CAST = data.body.cast.map((entry) => entry.name).join(':');
    this.RUNTIME = data.body.runtime;
  }

  get mlSearch() {
    return {
      Inputs: {
        input1: {
          ColumnNames: [
            'movieId',
            'title',
            'genres',
            'tmdbId',
            'popularity',
            'budget',
            'voteAvg',
            'runtime',
            'revenue',
            'cast',
          ],
          Values: [
            [
              this.ID,
              this.TITLE,
              this.GENRE,
              '0',
              `${this.POPULARITY}`,
              `${this.BUDGET}`,
              `${this.VOTE_AVG}`,
              `${this.RUNTIME}`,
              '0',
              this.CAST,
            ],
          ],
        },
      },
      GlobalParameters: {},
    };
  }
}

module.exports = MovieSearch;
