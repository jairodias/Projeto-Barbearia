const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
/**
 * VERIFICAÇÃO DE LOGIN
 * 
 */
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader) return res.json({ status: 0, message: "Usuário não autenticado"});

  const parts = authHeader.split(' '); /** estourando o authorization em duas partes */

  /** verificao do formato do token */
  if(!parts.length === 2) return res.json({ status:0, message: "Usuário não autenticado"});

  const [ scheme, token] = parts;

  if(!/^Bearer^$/i.test(scheme))
    return req.json({ status: 0, message: "Usuário não autenticado"})

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if(err) return res.json({ status: 0, message: "Usuário não autenticado"});

    req.tokenUser = decoded.id;

    return next();
  })

}