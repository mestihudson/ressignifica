// requeridos
var express = require('express');
var bodyParser = require("body-parser");

// variáveis
var app = express();
var args = process.argv.slice(2);
var assets = args[0] || '../client';
var PORT = 3000;
var atendimentos = [
  {
    "id": 1,
    "nome":"Hudson Leite",
    "nascimento": new Date(1980, 10, 10).getTime(),
    "telefone":"61981301010"
  },
  {
    "id": 2,
    "nome":"Manuel Neto",
    "nascimento": new Date(1986, 0, 19).getTime(),
    "telefone":"8694384662"
  }
];

// filtros
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(assets));
app.use('/', express.static(assets + '/index.html'));

// recursos
app.get('/atendimentos', function(request, response) {
  response.send(atendimentos);
});

app.get('/atendimento/:id', function(request, response) {
  atendimentos.forEach(function(atendimento) {
    if(atendimento.id == request.params.id) {
      response.json(atendimento);
      return;
    }
  });
  response.status(404);
});

// ligando servidor
app.listen(PORT);
console.log("rodando servidor mock na porta: " + PORT + " e servindo arquivos a partir do diretório: " + assets);
