angular.module("nafavd").factory("AtendimentoService", function($http, config){
  return {
    list: function() {
      return $http.get(config.BASE_URL + "/atendimentos");
    },
    get: function(id) {
      return $http.get(config.BASE_URL + "/atendimento/" + id);
    },
    save: function(atendimento) {
      return $http.post(config.BASE_URL + "/atendimento", atendimento);
    },
    update: function(atendimento) {
      return $http.put(config.BASE_URL + "/atendimento/" + atendimento._id, atendimento);
    },
    delete: function(atendimento) {
      return $http.delete(config.BASE_URL + "/atendimento/" + atendimento._id);
    }
  };
});
