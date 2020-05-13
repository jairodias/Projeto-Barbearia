const express = require('express');
const http = require("http");
const cors = require('cors');
var path = require ('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const uuid = require('uuid/v4');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(session({
    genid: (req) =>{
        console.log('dentro da sessão');
        console.log(req.sessionID);

        return  uuid();
    },
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors())

app.use('/assets', express.static(path.join(__dirname, '/assets')));



http.createServer(app).listen(3000, () => console.log("Servidor rodando local na porta 3000"));