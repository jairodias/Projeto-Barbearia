const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
  async create(req, res){
    const { user_id, local, data, horario, valor, funcionario} = req.body;

    try{
      const profissional = await connection('profissionais')
      .select('id')
      .where('nome', funcionario)
      .first();

      const id = crypto.randomBytes(5).toString('HEX');

      await connection('agendamentos').insert({
        user_id,
        local,
        data,
        horario,
        valor,
        profissional
      })
  
      console.log(req.body);
    }catch(err){
      console.log("Erro" + err);
    }
    
  }
}