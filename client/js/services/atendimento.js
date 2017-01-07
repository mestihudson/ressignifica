angular.module("nafavd").factory("AtendimentoService", function($http, config){
  return {
    list: function() {
      return $http.get(config.BASE_URL + "/atendimentos");
    }
  };
});
