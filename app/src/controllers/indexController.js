const connection = require('../../database/connection');

module.exports = {
    async create(request, response){
        const {name, password, email} = request.body;
    
            await connection('users').insert({
                name,
                password,
                email
            });
                
            return response.redirect('/');
    }
}