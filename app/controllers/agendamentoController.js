const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
  async create(req, res){
    const { user_id, local, data, horario, valor, funcionario} = req.body;
    console.log(user_id, local, data, horario, valor, funcionario);
    try{
      const profissional_id = await connection('profissionais')
      .select('id')
      .where('nome', funcionario)
      .first();

      const profissional = profissional_id.id;
      const atendido = 0;

      const id = crypto.randomBytes(5).toString('HEX');
      
      await connection('agendamentos').insert({
        id,
        user_id,
        local,
        data,
        horario,
        valor,
        profissional,
        atendido
      });

    }catch(err){
      console.log("Erro" + err);
    }
    
  }
}