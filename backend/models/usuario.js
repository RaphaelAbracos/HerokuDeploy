//importando o pacote
const mongoose = require ('mongoose');

//definindo o "schema"
//note a semelhança com recursos de bases relacionais
const usuarioSchema = mongoose.Schema ({
  nome: {type: String, required: true},
  senha: {type: String, required: true},
  email: {type: String, required: true}
  });

  module.exports = mongoose.model('Usuario', usuarioSchema);
