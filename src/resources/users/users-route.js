const express = require('express');
const router = express.Router();

const CreateMovieApi = require('./apis/create-movie-api');
const CreateCastApi = require('./apis/create-cast-api')
const CreateDirectorApi = require('./apis/create-director-api')
const CreateWriterApi = require('./apis/create-writer-api')

// const CreateUserApi = require('./apis/create-user-api');
const UpdateUserApi = require('./apis/update-user-api');
const GetUserApi = require('./apis/get-user-api');
const DeleteUserApi = require('./apis/delete-user-api');

// router.post('', CreateUserApi.post);
router.post('/movies', CreateMovieApi.post);
router.post('/directors', CreateDirectorApi.post)
router.post('/casts', CreateCastApi.post)
router.post('/writers', CreateWriterApi.post)

router.put('/:userId', UpdateUserApi.update);
router.get('/:userId', GetUserApi.get);
router.delete('/:userId', DeleteUserApi.delete);
module.exports = router;
