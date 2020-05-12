const connection = require('../../database/connection');

module.exports = {
    async create(request, response){
        const {name, password, password1, email} = request.body;
    
            await connection('users').insert({
                name,
                password,
                email
            });
                
            return response.redirect('/');
    }
}