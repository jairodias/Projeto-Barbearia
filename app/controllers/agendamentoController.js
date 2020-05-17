const connection = require('../database/connection');
const crypto = require('crypto');
const mailer = require('../modules/mailer');

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
      
      const agendamento = await connection('agendamentos').insert({
        id,
        user_id,
        local,
        data,
        horario,
        valor,
        profissional,
        atendido
      });

      const usuario = await connection('usuarios').where('id', user_id).first();

      mailer.sendMail({
        to: 'asdasd@asdasd.com',
        from: 'asdasd@asdasd.com',
        template: 'notification',
        context: {
          usuario,
          agendamento,
          funcionario,
        }
      });

      return res.json({
        status: 1,
        message: "Agendamento cadastrado com sucesso!"
      });

    } catch (err){
      console.log("Erro" + err);
    }
    
  }
}