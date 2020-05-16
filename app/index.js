const express = require('express');
const http = require("http");
const cors = require('cors');
var path = require ('path');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors())

app.use('/assets', express.static(path.join(__dirname, '/assets')));



http.createServer(app).listen(3000, () => console.log("Servidor rodando local na porta 3000"));