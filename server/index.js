// imports
var express = require("express");
var bodyParser = require("body-parser");
var uuid = require("uuid/v4");

// variables
var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();
var assets = process.env.ASSETS || "../client";

// filters
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(assets));
app.use("/", express.static(assets + "/index.html"));

router.use(function(request, response, next) {
    next();
});

// routes
router.route("/").get(function(request, response) {
  response.json({ message: "Ben-vindo a nossa api!"});
});

router.route("/atendimentos")
  .get(function(request, response) {
    console.log(atendimentos);
    response.json(atendimentos);
    response.status(200);
    response.end();
  });

router.route("/atendimento/:id")
  .get(function(request, response) {
    var atendimento = findBy(atendimentos, function(atendimento) {
      return atendimento.id === request.params.id;
    });
    if(atendimento !== null) {
      response.json(atendimento);
      response.status(200);
      response.end();
      return;
    } else {
      response.status(404);
    }
  })
  .put(function(request, response) {
    var index = indexOf(atendimentos, function(atendimento) {
      return atendimento.id === request.params.id;
    });
    if(index !== -1) {
      response.json(atendimentos[index] = request.body);
      response.status(200);
      response.end();
      return;
    } else {
      response.status(404);
    }
  })
  .delete(function(request, response) {
    var index = indexOf(atendimentos, function(atendimento) {
      return atendimento.id === request.params.id;
    });
    if(index !== -1) {
      atendimentos.splice(index, 1);
      response.status(200);
      response.end();
      return;
    } else {
      response.status(404);
    }
  });

router.route("/atendimento")
  .post(function(request, response) {
    var atendimento = request.body;
    console.log(atendimento);
    atendimento = save(atendimentos, atendimento);
    console.log(atendimento);
    response.json(atendimento);
    response.status(200);
    response.end();
  });

// service
var save = function(collection, item) {
  item.id = id();
  collection.push(item);
  return item;
};

var id = function() {
  return uuid();
};

var indexOf = function(collection, asserter) {
  var result = -1;
  collection.forEach(function(item, index) {
    if(asserter(item, index, collection)) {
      result = index;
      return;
    }
  });
  return result;
}

var findBy = function(collection, by) {
  var result = null;
  var index = indexOf(collection, by);
  if(index !== -1) {
    result = collection[index];
  }
  return result;
}

// data
var questionario = {
  "reencaminhamento": [{
    "id": id(),
    "descricao": "mesmo processo"
  },{
    "id": id(),
    "descricao": "outro processo"
  },{
    "id": id(),
    "descricao": "sem informação"
  }],
  "situacao": [{
    "id": id(),
    "descricao": "concluído"
  },{
    "id": id(),
    "descricao": "encerramento"
  }],
  "encerramento": [{
    "id": id(),
    "descricao": "abandono"
  },{
    "id": id(),
    "descricao": "faltas"
  },{
    "id": id(),
    "descricao": "não apresentou perfil"
  }],
  "indicaria": [{
    "id": id(),
    "descricao": "sim"
  },{
    "id": id(),
    "descricao": "não"
  },{
    "id": id(),
    "descricao": "não opinou"
  }],
  "relacionamento": [{
    "id": id(),
    "descricao": "mesmo relacionamento"
  },{
    "id": id(),
    "descricao": "outro relacionamento"
  },{
    "id": id(),
    "descricao": "sem relacionamento"
  },{
    "id": id(),
    "descricao": "não opinou"
  }]
};

var atendimentos = [{
  "id": id(),
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
  "id": id(),
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

// config to prefix routers
app.use("/api", router);

// start app
app.listen(port);
console.log("A mágica acontece na porta: " + port);
