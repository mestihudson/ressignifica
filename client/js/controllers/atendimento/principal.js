angular.module("nafavd").controller("AtendimentoPrincipalController", function($scope, atendimentos) {
  $scope.atendimentos = atendimentos.data;
});
