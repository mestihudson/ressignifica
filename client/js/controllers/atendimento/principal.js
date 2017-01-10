angular.module("nafavd").controller("AtendimentoPrincipalController", function($scope, atendimentos, $location) {
  $scope.atendimentos = atendimentos.data;
  $scope.detalhes = function(id) {
    $location.path("/atendimento/" + id);
  }
});
