angular.module("nafavd").controller("AtendimentoDetalhesController", function($scope, atendimento, $filter) {
  atendimento.data.telefone = $filter("phone")(atendimento.data.telefone);
  // atendimento.data.nascimento = $filter("date")(atendimento.data.nascimento, "dd/MM/yyyy");
  $scope.atendimento = atendimento.data;
});
