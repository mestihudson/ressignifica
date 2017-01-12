angular.module("nafavd").controller("AtendimentoDetalhesController", function($scope, atendimento, $filter, questionario) {
  var _situacaoByDescricao = function(descricao) {
    return $scope.questionario.situacao.filter(function(item) {
      return item.descricao === descricao;
    })[0];
  };

  var _encerrado = function() {
    var situacao = $scope.atendimento.questionario.situacao;
    return !situacao ? false : _situacaoByDescricao("encerramento").id === situacao.id;
  };

  var _mudarSituacao = function() {
    if(!_encerrado()) {
      delete $scope.questionario.encerramento;
    }
  };

  $scope.atendimento = atendimento.data;
  $scope.questionario = questionario.data;
  $scope.encerrado = _encerrado;
  $scope.mudarSituacao = _mudarSituacao;
});
