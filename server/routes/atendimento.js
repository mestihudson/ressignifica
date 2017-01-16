var mongoose = require("mongoose");
var Atendimento = require("../models/atendimento");

function list(request, response) {
  Atendimento.find({})
    .exec((error, atendimentos) => {
      if(error) {
        response.send(error);
      } else {
        response.json(atendimentos);
      }
    });
}

function save(request, response) {
  new Atendimento(request.body)
    .save((error, atendimento) => {
      if(error) {
        response.send(error);
      } else {
        response.json(atendimento);
      }
    });
}

function get(function(request, response) {
  Atendimento.findById(request.params.id, (error, atendimento) => {
    if(error) {
      response.send(error);
    } else {
      response.json(atendimento);
    }
  });
});
