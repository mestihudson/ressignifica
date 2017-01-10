angular.module("nafavd").controller("AtendimentoDetalhesController", function($scope, atendimento, $filter, questionario) {
  atendimento.data.telefone = $filter("phone")(atendimento.data.telefone);
  atendimento.data.nascimento = $filter("date")(atendimento.data.nascimento, "dd/MM/yyyy");
  $scope.atendimento = atendimento.data;
  $scope.questionario = questionario.data;
});
