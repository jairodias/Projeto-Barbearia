const express = require('express');
const routes = express.Router();
const path = require('path');
const auth = require('../controllers/authController');


routes.get('/', (req, res) => {
  return res.sendFile(path.resolve('app/views/index.html'));
})

routes.get('/cadastro', (req, res) => {
  return res.sendFile(path.resolve('app/views/cadastro.html'));
})

routes.post('/cadastrar', auth.create);

routes.post('/login', auth.authenticate);



module.exports = routes;