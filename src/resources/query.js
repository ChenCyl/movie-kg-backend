module.exports = {
  GetNetByName: class GetNetByName {
    constructor(name) {
      this.details = {
        name: name.replace(/'/g , "\\'" )
      }
    }
    get() {
      // 模糊查询
      return `match(n)-[rel]-(m) where n.name =~ '.*${this.details.name}.*' return n,m,Type(rel)`      
    }
    parameter() {
      return this.details;
    }
    transform(record) {
      return record.get("n")
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
  },
  GetHighRateMovie: class GetHighRateMovie {
    constructor() {
      this.details = {
      }
    }
    get() {
      return `match (movie:Movie) where movie.rating > '9' return movie`
    }
    parameter() {
      return this.details;
    }
    transform(record) {
      return record.get("movie")
    }
  },

  GetPeopleFilmMost: class GetPeopleFilmMost {
    constructor() {
      this.details = {
      }
    }
    get() {
      return `match (movie:Movie)-[]-(person:Person) return person, count(movie) order by count(movie) DESC limit 1`
    }
    parameter() {
      return this.details;
    }
    transform(record) {
      return record.get("person")
    }
  },
}