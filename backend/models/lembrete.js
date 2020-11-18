//importando o pacote
const mongoose = require("mongoose");

//definindo o "schema"
//note a semelhança com recursos de bases relacionais
const lembreteSchema = mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  data: { type: Date, required: true },
  dataInicial: {type: Date, required: true}
});

module.exports = mongoose.model("Lembrete", lembreteSchema);
