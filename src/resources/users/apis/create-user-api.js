const db = require('../../../database/repository');
// const uuid = require('node-uuid');
const CreateUserQuery = require('../queries/create-user-query.js');
module.exports.post = function (req, res, next) {

    const id = req.body.id;
    const { label, name } = req.body;
    const result = db.execute(new CreateUserQuery(id, {
        label, name
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
}