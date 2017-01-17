let _questionario = {
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

function list(request, response) {
  response.json(_questionario);
}

module.exports = { list };
