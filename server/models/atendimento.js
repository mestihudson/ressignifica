var mongoose = require("mongoose");

var AtendimentoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  nascimento: { type: Date },
  telefone: { type: String },
  criadoEm: { type: Date, default: Date.now }
}, {
  versionKey: false
});

AtendimentoSchema.pre("save", next => {
  now = new Date();
  if(!this.criadoEm) {
    this.criadoEm = now;
  }
  next();
});

module.exports = mongoose.model("atendimento", AtendimentoSchema);
