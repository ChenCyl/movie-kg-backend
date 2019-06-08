module.exports = {
  GetNetByName: class GetNetByName {
    constructor(name) {
      this.details = {
        name: name
      }
    }

    get() {
      return `match (n {name: "${this.details.name}"})-[rel]-(m) return n,m,Type(rel)`
    }

    parameter() {
      return this.details;
    }

    transform(record) {
      return record.get("n")
    }
  },
  // GetNetByPersonName: class GetNetByPersonName {
  //   constructor(personName) {
  //     this.details = {
  //       name: personName
  //     }
  //   }
  //   get() {
  //     return `match (person:Person {name: "${this.details.name}"})-[rel]-(movie) return person,movie,Type(rel)`
  //   }
  //   parameter() {
  //     return this.details;
  //   }
  //   transform(record) {
  //     return record.get("movie")
  //   }
  // },
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
  GetPeopleWithLimit: class GetPeopleWithLimit {
    constructor(limit) {
      this.details = {
        limit: limit
      }
    }
    get() {
      return `match (person:Person) return person limit ${this.details.limit}`
    }
    parameter() {
      return this.details;
    }
    transform(record) {
      return record.get("person")
    }
  }
}