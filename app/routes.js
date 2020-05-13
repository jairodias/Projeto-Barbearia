const express = require("express");
const cors = require('cors');
const users = require('./src/controllers/indexController');


const routes = express.Router();


routes.get("/", function(req, res) {
    console.log(req.sessionID);
    res.sendFile(__dirname + "/views/index.html");
});

routes.get('/cadastro', function(req, res){
    res.sendFile(__dirname + "/views/cadastro.html");
})

routes.post('/cadastrar', users.create);

routes.post("/login", users.login);

module.exports = routes;

