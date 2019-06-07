const db = require('../database/repository');
const query = require('./query.js');
module.exports = {

  getNetByMovieTitle: function (req, res, next) {
    // console.log(req)
    const { title } = req.params;
    const result = db.execute(new query.GetNetByMovieTitle(title), (error, result) => {
      if (error) {
        res.send({
          status: false,
          entity: error,
          message: 'something went wrong'
        })
      }
      res.send({ status: true, entity: result, message: 'Successfully!' })
    });
  },
  getNetByPersonName: function (req, res, next) {
    const { name } = req.params
    db.execute(new query.GetNetByPersonName(name), (error, result) => {
      if (error) {
        res.send({
          status: false,
          entity: error,
          message: 'something went wrong'
        })
      }
      res.send({ status: true, entity: result, message: 'Successfully!' })
    })
  },
  getMoviesWithLimit: function (req, res, next) {
    const { limit } = req.params
    db.execute(new query.GetMoviesWithLimit(limit), (error, result) => {
      if (error) {
        res.send({
          status: false,
          entity: error,
          message: 'something went wrong'
        })
      }
      res.send({ status: true, entity: result, message: 'Successfully!' })
    })
  }

}