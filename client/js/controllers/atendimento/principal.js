angular.module("nafavd").controller("AtendimentoPrincipalController", function($scope, AtendimentoService) {
  (function(){
    AtendimentoService.list().success(function(data) {
      $scope.atendimentos = data;
    });
  })();
});
