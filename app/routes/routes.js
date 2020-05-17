const express = require('express');
const routes = express.Router();
const connection = require('../database/connection');
const path = require('path');
const auth = require('../controllers/authController');
const verify = require('../middlewares/auth'); /**responsavel por fazer a verificação dos token */
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const agendamento = require('../controllers/agendamentoController');

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

routes.get('/areaCliente/:usuario', async (req, res) => {
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
  try{
    const usuario  = await connection('usuarios').where('id', req.query.usuario).first();

    if(!usuario) return res.json({ status: 0, message: 'Users not exists' });

    const agendamentos = await connection('agendamentos').where('user_id', usuario.id);
    const movimentacao = await connection('saldoUsuario').where('user_id', usuario.id);
    if(agendamentos){
     agendamentos.forEach(async (data) => {
      const funcionario = await connection('profissionais').where('id', data.profissional);
      data.profissional = funcionario;
      });
    }

    console.log(usuario, agendamentos, movimentacao);
      

    return res.json({
      status: 1,
      agendamentos: agendamentos,
      movimentacao: movimentacao
    });

  }catch(err){
    return res.json({
      status: 0,
      message: err
    });
  }
  console.log(req.body, req.query);
})

routes.post('/create', agendamento.create);


module.exports = routes;