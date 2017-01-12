angular.module("nafavd").controller("AtendimentoDetalhesController", function($scope, atendimento, $filter, questionario, $location, AtendimentoService) {
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

  var _cancelar = function() {
    $scope.atendimentoForm.$setPristine();
    $location.path("/atendimentos");
  };

  var _salvar = function(atendimento) {
    AtendimentoService.save(atendimento)
      .success(function(a,b,c,d) {
        console.log(a,b,c,d);
      })
      .error(function(a,b,c,d) {
        console.log(a,b,c,d);
      });
  };

  $scope.atendimento = atendimento.data;
  $scope.questionario = questionario.data;
  $scope.encerrado = _encerrado;
  $scope.mudarSituacao = _mudarSituacao;
  $scope.cancelar = _cancelar;
  $scope.salvar = _salvar;
});
