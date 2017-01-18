// imports
let express = require("express");
let bodyParser = require("body-parser");
let uuid = require("uuid/v4");
let config = require("config");
let mongoose = require("mongoose");
let morgan = require("morgan");
let atendimento = require("./routes/atendimento");
let questionario = require("./routes/questionario");

// variables
let app = express();
let port = process.env.PORT || 3000;
let router = express.Router();
let assets = process.env.ASSETS || "../client";
let options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
};

// filters
mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
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
router.route("/questionarios")
  .get(questionario.list);

router.route("/atendimentos")
  .get(atendimento.list);

router.route("/atendimento/:id")
  .get(atendimento.get)
  .put(atendimento.update)
  .delete(atendimento.remove);

router.route("/atendimento")
  .post(atendimento.save);

// config to prefix routers
app.use("/api", router);

// start app
app.listen(port);
console.log("A mágica acontece na porta: " + port);

// wanted for testing
module.exports = app;
