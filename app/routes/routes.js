const express = require('express');
const routes = express.Router();
const connection = require('../database/connection');
const path = require('path');
const auth = require('../controllers/authController');
const verify = require('../middlewares/auth'); /**responsavel por fazer a verificação dos token */
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

function generateToken(params = {}){
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  })
}

routes.get('/', (req, res) => {
  return res.sendFile(path.resolve('app/views/index.html'));
})

routes.get('/cadastro', (req, res) => {
  return res.sendFile(path.resolve('app/views/cadastro.html'));
})

routes.post('/cadastrar', auth.create);

routes.post('/login', auth.authenticate);

routes.get('/areaCliente/:usuario', (req, res) => {
  try{
    const usuario = await connection('usuarios').where('id', req.query.usuario).first();

    if(!usuario)
      return res.status(400).send('Users not exists');

  }catch(err){

  }
  return res.sendFile(path.resolve('app/views/area.html'), {
    token: generateToken({id: req.query.usuario})
  });
});

routes.get('/cliente', async (req, res) => {
  
})



module.exports = routes;