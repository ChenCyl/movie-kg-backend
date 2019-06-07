const db = require('../../../database/repository');
const uuid = require('node-uuid');
const CreateRelQuery = require('../queries/create-rel-query.js');
module.exports.post = function (req, res, next) {

    req.body.forEach(movie => {
        let { _id, directors, casts, writers } = movie
        //   personId: personId,
        //   personDetails, // label / name
        //   movieId: movieId, 
        //   movieDetails // title / pubdate / rating.average:8.0
        directors.forEach(director => {
          db.execute(new CreateRelQuery(director.id, "Director",_id,), (error, result) => {
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
          db.execute(new CreateRelQuery(cast.id,"Actor",_id), (error, result) => {
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
          db.execute(new CreateRelQuery(writer.id, "Writer",_id), (error, result) => {
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