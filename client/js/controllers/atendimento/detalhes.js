angular.module("nafavd").controller("AtendimentoDetalhesController", function($scope, atendimento, $filter, questionario) {
  atendimento.data.telefone = $filter("phone")(atendimento.data.telefone);
  atendimento.data.nascimento = $filter("date")(atendimento.data.nascimento, "dd/MM/yyyy");

  $scope.atendimento = atendimento.data;
  $scope.questionario = questionario.data;

  var _situacaoByDescricao = function(descricao) {
    return $scope.questionario.situacao.filter(function(item) {
      return item.descricao === descricao;
    })[0];
  };

  $scope.encerrado = function() {
    var situacao = $scope.atendimento.questionario.situacao;
    return !situacao ? false : _situacaoByDescricao("encerramento").id === situacao.id;
  };
});
