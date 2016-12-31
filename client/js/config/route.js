angular.module("nafavd").config(function($routeProvider){
  $routeProvider
    .when("/autenticacao/entrada", {
      templateUrl: "view/autenticacao/entrada.html",
      controller: "AutenticacaoEntradaController"
    })
    .when("/atendimentos", {
      templateUrl: "view/atendimento/principal.html",
      controller: "AtendimentoPrincipalController",
      resolve: {
        atendimentos: function(AtendimentoService) {
          return AtendimentoService.list();
        }
      }
    })
    .otherwise("/autenticacao/entrada");
});
