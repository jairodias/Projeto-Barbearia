const express = require('express');
const routes = express.Router();
const path = require('path');

routes.get('/', (req, res) => {
  return res.sendFile(path.resolve('app/views/index.html'));
})



module.exports = routes;