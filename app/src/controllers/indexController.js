const connection = require('../../database/connection');

module.exports = {
    async create(request, response){
        console.log(request.body);
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
        console.log(request.body);
        const{email, password} = request.body;

        const user = await connection('incidents')
            .where('email', email)
            .where('password', password)
            .select('*');

        console.log(user);
    }
}