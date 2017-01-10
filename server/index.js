// requeridos
var express = require('express');
var bodyParser = require("body-parser");

// variáveis
var app = express();
var args = process.argv.slice(2);
var assets = args[0] || '../client';
var PORT = 3000;

var questionario = {
  "reencaminhamento": [{
    "id": 1,
    "descricao": "mesmo processo"
  },{
    "id": 2,
    "descricao": "outro processo"
  },{
    "id": 3,
    "descricao": "sem informação"
  }],
  "situacao": [{
    "id": 1,
    "descricao": "concluído"
  },{
    "id": 2,
    "descricao": "encerramento"
  }],
  "encerramento": [{
    "id": 1,
    "descricao": "abandono"
  },{
    "id": 2,
    "descricao": "faltas"
  },{
    "id": 3,
    "descricao": "não apresentou perfil"
  }],
  "indicaria": [{
    "id": 1,
    "descricao": "sim"
  },{
    "id": 2,
    "descricao": "não"
  },{
    "id": 3,
    "descricao": "não opinou"
  }],
  "relacionamento": [{
    "id": 1,
    "descricao": "mesmo relacionamento"
  },{
    "id": 2,
    "descricao": "outro relacionamento"
  },{
    "id": 3,
    "descricao": "sem relacionamento"
  },{
    "id": 4,
    "descricao": "não opinou"
  }]
};

var atendimentos = [{
  "id": 1,
  "nome": "Hudson Leite",
  "nascimento": new Date(1980, 10, 10).getTime(),
  "telefone": "61981301010",
  "questionario": {
    "reencaminhamento": { "id": 1 },
    "situacao": { "id": 1 },
    "indicaria": { "id": 1 },
    "relacionamento": { "id": 1 }
  }
},{
  "id": 2,
  "nome": "Manuel Neto",
  "nascimento": new Date(1986, 0, 19).getTime(),
  "telefone": "8694384662",
  "questionario": {
    "reencaminhamento": { "id": 2 },
    "situacao": { "id": 2 },
    "encerramento": { "id": 1 },
    "indicaria": { "id": 3 },
    "relacionamento": { "id": 3 }
  }
}];

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

app.get('/questionario', function(request, response) {
  response.send(questionario);
});

// ligando servidor
app.listen(PORT);
console.log("rodando servidor mock na porta: " + PORT + " e servindo arquivos a partir do diretório: " + assets);
