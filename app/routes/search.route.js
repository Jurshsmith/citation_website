const router = require('express').Router();
const SearchController = require('./../controllers/search.controller');


router.get('/search', (req, res, next) => {
    console.log("Search Route");
});


module.exports = router;