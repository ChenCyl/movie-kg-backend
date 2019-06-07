module.exports = class CreateMovieQuery {
	constructor(movieId, movieDetails) {
		this.details = {
			movieId: movieId,
			movieDetails
		}
	}

	parameter() {
		return this.details;
	}

	get() {
		return `\
      merge (movie:Movie {id:${this.details.movieId}})\
      on create set movie.title = "${this.details.movieDetails.title}"\
     	set movie.pubdate = "${this.details.movieDetails.pubdate}"\
      set movie.rating = ${this.details.movieDetails.rating}\
      return movie{.*}`
	}

	transform(record) {
		return record.get('movie')
	}
}