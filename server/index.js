// imports
var express = require("express");
var bodyParser = require("body-parser");
var uuid = require("uuid/v4");
var mongoose = require("mongoose");
var morgan = require("morgan");
var atendimento = require("./routes/atendimento");

// variables
var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();
var assets = process.env.ASSETS || "../client";
var options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 }
};

// filters
mongoose.connect(config.DBHost, options);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

if(config.util.getEnv("NODE_ENV") !== "test") {
  app.use(morgan("combined"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));
app.use(express.static(assets));
app.use("/", express.static(assets + "/index.html"));

router.use(function(request, response, next) {
    next();
});

// routes
router.route("/").get(function(request, response) {
  response.json({ message: "Ben-vindo a nossa api!"});
});

router.route("/questionarios")
  .get(function(request, response) {
    response.json(questionario);
    response.status(200);
    response.end();
  });

router.route("/atendimentos")
  .get(function(request, response) {
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
    var atendimento = request.body;
    var id = request.params.id;
    if(update(atendimentos, id, atendimento)) {
      response.json();
      response.status(200);
      response.end();
      return;
    } else {
      response.status(404);
    }
  })
  .delete(function(request, response) {
    var id = request.params.id;
    if(remove(atendimentos, id)) {
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
    atendimento = save(atendimentos, atendimento);
    response.json(atendimento);
    response.status(200);
    response.end();
  });

// service
var remove = function(collection, id) {
  var index = indexOf(collection, function(element) {
    return element.id === id;
  });
  if(index !== -1) {
    collection.splice(index, 1);
    return true;
  } else {
    return false;
  }
};

var update = function(collection, id, item) {
  var index = indexOf(collection, function(element) {
    return element.id === id;
  });
  if(index !== -1) {
    return (collection[index] = item);
  } else {
    return null;
  }
};

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

// wanted for testing
module.exports = app;
