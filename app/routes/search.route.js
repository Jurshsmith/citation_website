"use strict"

const router = require('express').Router();
const SearchController = require('./../controllers/search.controller');
const DefaultController = require('./../controllers/default.controller');

router.get('/search', SearchController.handleSearch);

router.use('/*', DefaultController.sendDefaultResponse)


module.exports = router;