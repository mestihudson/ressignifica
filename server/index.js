// imports
var express = require("express");
var bodyParser = require("body-parser");
var uuid = require("uuid/v4");
var mongoose = require("mongoose");
var morgan = require("morgan");
var atendimento = require("./routes/atendimento");
var questionario = require("./routes/questionario");

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
  .get(questionario.list);

router.route("/atendimentos")
  .get(atendimento.list);

router.route("/atendimento/:id")
  .get(atendimento.get)
  .put(atendimento.update)
  .delete(atendimento.delete);

router.route("/atendimento")
  .post(atendimento.save);

// config to prefix routers
app.use("/api", router);

// start app
app.listen(port);
console.log("A mágica acontece na porta: " + port);

// wanted for testing
module.exports = app;
