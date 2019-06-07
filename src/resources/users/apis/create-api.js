const db = require('../../../database/repository');
// const uuid = require('node-uuid');
const CreateRelQuery = require('../queries/create-rel-query.js');
module.exports.post = function (req, res, next) {

  req.body.forEach(movie => {
    console.log(movie.title)
    let { _id, title, pubdate, rating, directors, casts, writers } = movie
    //   personId: personId,
    //   personDetails, // label / name
    //   movieId: movieId, 
    //   movieDetails // title / pubdate / rating.average:8.0
    directors.forEach(director => {
      db.execute(new CreateRelQuery(director.id, { label: "Director", name: director.name },
        _id, { title, pubdate, rating: rating.average }), (error, result) => {
          if (error) {
            console.log(error)
            res.send({
              status: false,
              entity: error,
              message: 'something went wrong'
            })
          }
          res.send({ status: true, entity: result, message: 'Successfully saved' })
        });
    })

    casts.forEach(cast => {
      db.execute(new CreateRelQuery(cast.id, { label: "Actor", name: cast.name },
        _id, { title, pubdate, rating: rating.average }), (error, result) => {
          if (error) {
            console.log(error)
            res.send({
              status: false,
              entity: error,
              message: 'something went wrong'
            })
          }
          res.send({ status: true, entity: result, message: 'Successfully saved' })
        });
    })

    writers.forEach(writer => {
      db.execute(new CreateRelQuery(writer.id, { label: "Writer", name: writer.name },
        _id, { title, pubdate, rating: rating.average }), (error, result) => {
          if (error) {
            console.log(error)
            res.send({
              status: false,
              entity: error,
              message: 'something went wrong'
            })
          }
          res.send({ status: true, entity: result, message: 'Successfully saved' })
        });
    })
  });
}