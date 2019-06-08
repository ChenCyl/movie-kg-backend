const express = require('express');
const router = express.Router();

const api = require('./api')

router.get('/:name', api.getNetByName)
router.get('/movies/:limit', api.getMoviesWithLimit)
router.get('/people/:limit', api.getPeopleWithLimit)

module.exports = router;
