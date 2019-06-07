// 增加一个结点
// CREATE (dept:Dept { deptno:10,dname:"Accounting",location:"Hyderabad" })

// 增加一个边（节点已经存在
// MATCH (e:Customer),(cc:CreditCard) 
// CREATE (e)-[r:DO_SHOPPING_WITH ]->(cc) 

// 增加一个边（节点不存在
// CREATE (fb1:FaceBookProfile1)-[like:LIKES]->(fb2:FaceBookProfile2) 

module.exports = class CreateRelQuery {
  constructor(personId, personLabel, movieId) { // rel 首字母大写
    this.details = {
      personId: personId,
      personLabel: personLabel, 
      movieId: movieId, 
    }
    switch (this.details.personLabel) {
      case "Actor":
        this.rel = "Acted_in"
        break;
      case "Director":
        this.rel = "Directed"
        break;
      case "Writer":
        this.rel = "written"
        break;
      default:
        break;
    }
  }

  parameter() {
    return this.details;
  }

  // get() {
  //   return `
  //     merge (person:Person {id: ${this.details.personId}})\
  //     on create set person:${this.details.personDetails.label},\
  //     person.name = "${this.details.personDetails.name}"\
  //     merge (movie:Movie {id: ${this.details.movieId}})\
  //     on create set movie.title = "${this.details.movieDetails.title}",\
  //     movie.pubdate = "${this.details.movieDetails.pubdate}",\
  //     movie.rating = ${this.details.movieDetails.rating}\
  //     create (person)-[:${this.rel}]->(movie)`
  // }

  get() {
    return `
      match (person:Person {id: ${this.details.personId}}), (movie:Movie {id: ${this.details.movieId}})\
      create (person)-[:${this.rel}]->(movie)`
  }

  transform(record) {
    return record.get('user')
  }
}