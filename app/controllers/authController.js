const connection = require('../database/connection');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

function generateToken(params = {}){
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  })
}

module.exports = {
    async create(request, response){
      const { email, password1} = request.body;
      const saltRounds = 10;
      const id = crypto.randomBytes(5).toString('HEX');
      try{
        const usuario = await connection('usuarios')
        .where('email', email)
        .first();

        if(usuario){
          return response.json({
            status: 0,
            message: "Usuário já cadastrado!"
          })
        }

         /** encriptografando a senha  */
        const hash = await bcrypt.hash(password1, saltRounds);
        const password = hash;

        await connection('usuarios').insert({
          id,
          email,
          password
        });
     

        return response.json({
          status: 1,
          message: 'Usuário cadastrado com sucesso!'
        })

      }catch(err){
        return response.json({
          status: 0,
          message: 'Falha ao cadastrar usuário'
        });

      } 
    },

    async authenticate(request, response){
      try{
        const { email,  password} = request.body;
        const usuario = await connection('usuarios').where('email', email).first();

        if(!usuario)
          return response.json({ status: 0, message: 'Email não cadastrado, tente novamente'});

        if(!await(bcrypt.compare(password, usuario.password))){
          return response.json({
            status: 0,
            message: "Senha incorreta, tente novamente"
          });
        }
      
        return response.json({
          status: 1,
          usuario: usuario.id,
          message: "Bem vindo a nossa plataforma, aproveite !"
        })

      }catch(err){
        console.log(err);
        return response.json({
          status: 0,
          message: 'Falha ao realizar login'
        })
      }
    },
  
}

