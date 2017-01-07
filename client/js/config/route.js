angular.module("nafavd").config(function($routeProvider){
  $routeProvider
    .when("/atendimentos", {
      controller: "AtendimentoPrincipalController",
      templateUrl: "view/atendimento/principal.html",
      resolve: {
        atendimentos: function(AtendimentoService) {
          return AtendimentoService.list();
        }
      }
    })
    .otherwise("/atendimentos");
});
