//importando o pacote
const mongoose = require("mongoose");

//definindo o "schema"
//note a semelhança com recursos de bases relacionais
const lembreteSchema = mongoose.Schema({
  nome: { type: String, required: false },
  descricao: { type: String, required: false },
  data: { type: Date, required: false },
  dataInicial: {type: Date, required: false}
});

module.exports = mongoose.model("Lembrete", lembreteSchema);
