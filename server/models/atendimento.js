let mongoose = require("mongoose");

let AtendimentoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  nascimento: { type: Date },
  telefone: { type: String },
  questionario: {
    reencaminhamento: { id: Number },
    situacao: { id: Number },
    encerramento: { id: Number },
    indicaria: { id: Number },
    relacionamento: { id: Number }
  },
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
