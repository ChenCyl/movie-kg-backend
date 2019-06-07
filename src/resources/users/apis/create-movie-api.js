const db = require('../../../database/repository');
// const uuid = require('node-uuid');
const CreateMovieQuery = require('../queries/create-movies-query.js');
module.exports.post = function (req, res, next) {
    req.body.forEach(movie => {
        let id = movie._id
        let { title, pubdate, rating } = movie;
        let result = db.execute(new CreateMovieQuery(id, {
            title, pubdate, rating: rating.average
        }), (error, result) => {
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
}