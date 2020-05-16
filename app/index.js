const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');

const app = express();
/** HABILITANDO AS PASTAS DE ESTILIZAÇÃO DO PROJETO */
app.use('/assets', express.static(path.join(__dirname, '/assets')));

app.use(express.static(path.resolve('app/assets')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);