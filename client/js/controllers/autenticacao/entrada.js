angular.module("nafavd").controller("AutenticacaoEntradaController", function($scope, $location, AutenticacaoService) {
  $scope.credenciais = { email: "", senha: "" };

  $scope.entrar = function() {
    AutenticacaoService.entrar($scope.credenciais).success(function() {
      $location.path("/atendimento/principal");
    });
  };
});
