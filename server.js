const express = require("express");
const server = express();
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 4000;

server.use(require('./app/middlewares/cors.middleware'));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

server.use(express.static(__dirname + '/client'));

server.use('/api', require('./app/routes/search.route'));

server.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/client/index.html'));
});

server.listen(PORT, () => {
    console.log("Server is currently listening to requests on ", PORT);
});