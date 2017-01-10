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
    .when("/atendimento/:id", {
      controller: "AtendimentoDetalhesController",
      templateUrl: "view/atendimento/detalhes.html",
      resolve: {
        atendimento: function(AtendimentoService, $route) {
          return AtendimentoService.get($route.current.params.id);
        }
      }
    })
    .otherwise("/atendimentos");
});
