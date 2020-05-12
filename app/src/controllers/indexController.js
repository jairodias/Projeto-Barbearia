const connection = require('../../database/connection');

module.exports = {
    async create(request, response){
        const {name, password, password1, email} = request.body;
    
        if(password == password1){
            await connection('users').insert({
                name,
                password,
                email,
            });

            return response.redirect('/');
        }else{
            
            const dados = await connection('users').select('*');

            console.log(dados);
        }
    }
}