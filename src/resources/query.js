module.exports = {
  GetNetByMovieTitle: class GetNetByMovieTitle {
    constructor(movieTitle) {
      this.details = {
        title: movieTitle
      }
    }

    get() {
      return `match (movie:Movie {title: "${this.details.title}"})-[rel]-(person) return movie,person,Type(rel)`
    }

    parameter() {
      return this.details;
    }

    transform(record) {
      return record.get("person")
    }
  },
  GetNetByPersonName: class GetNetByPersonName {
    constructor(personName) {
      this.details = {
        name: personName
      }
    }
    get() {
      return `match (person:Person {name: "${this.details.name}"})-[rel]-(movie) return person,movie,Type(rel)`
    }
    parameter() {
      return this.details;
    }
    transform(record) {
      return record.get("movie")
    }
  },
  GetMoviesWithLimit: class GetMoviesWithLimit {
    constructor(limit) {
      this.details = {
        limit: limit
      }
    }
    get() {
      return `match (movie:Movie) return movie limit ${this.details.limit}`
    }
    parameter() {
      return this.details;
    }
    transform(record) {
      return record.get("movie")
    }
  }
}