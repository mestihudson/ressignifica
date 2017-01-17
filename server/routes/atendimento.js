let mongoose = require("mongoose");
let Atendimento = require("../models/atendimento");

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
        response.json({ message: "Atendimento adicionado com sucesso", atendimento });
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
}

function delete(request, response) {
  Atendimento.remove({ _id: request.params.id}, (error, result) => {
    response.json({ message: "Atendimento removido com sucesso", result });
  });
}

function update(request, response) {
  Atendimento.findById({ _id: request.params.id }, (error, atendimento) => {
    if(error) {
      response.send(error);
    }
    Object.assign(atendimento, request.body).save((error, atendimento) => {
      if(error) {
        response.send(error);
      } else {
        response.json({ message: "Atendimento atualizado com sucesso", atendimento });
      }
    });
  });
}

module.exports = { list, save, get, delete, update };
