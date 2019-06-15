const express = require('express');
const router = express.Router();

const api = require('./api')

router.get('/:name', api.getNetByName)
router.get('/movies/highrate', api.getHighRateMovie)
router.get('/movies/:limit', api.getMoviesWithLimit)
router.get('/people/filmmost', api.getPeopleFilmMost)


module.exports = router;
