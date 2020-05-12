const express = require("express");
var path = require ('path');
const cors = require('cors');
const http = require("http");
const app = express();
const bodyParser = require('body-parser');


const users = require('./src/controllers/indexController');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors())

app.use('/assets', express.static(path.join(__dirname, '/assets')));


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.get('/cadastro', function(req, res){
    res.sendFile(__dirname + "/views/cadastro.html");
})

app.post('/cadastrar', users.create);

app.post("/login", function(req, res){
    
})

http.createServer(app).listen(3000, () => console.log("Servidor rodando local na porta 3000"));
