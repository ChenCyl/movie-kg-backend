const express = require('express');
const router = express.Router();

const api = require('./api')

router.get('/movie/:title', api.getNetByMovieTitle)
router.get('/person/:name', api.getNetByPersonName)
router.get('/movies/:limit', api.getMoviesWithLimit)

module.exports = router;
