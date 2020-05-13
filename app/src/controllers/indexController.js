const connection = require('../../database/connection');

module.exports = {
    async create(request, response){
        const {name, password, email} = request.body;

            await connection('users').insert({
                name,
                password,
                email
            });
                
            return response.json({
                status: 1,
                message: "Dados cadastrados com sucesso"
            });
    },
    async login(request, response){
        const{email, password} = request.body;

        const user = await connection('incidents')
            .where('email', email)
            .where('password', password)
            .select('*');

        console.log(user);
    }
}