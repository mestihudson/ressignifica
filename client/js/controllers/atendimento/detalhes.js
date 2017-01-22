angular.module("Resignifica").controller("AtendimentoDetalhesController", function($scope, atendimento, $filter, questionario, $location, AtendimentoService, $timeout) {
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

  var _voltar = function() {
    $scope.atendimentoForm.$setPristine();
    $location.path("/atendimentos");
  };

  var _salvar = function(atendimento) {
    AtendimentoService.update(atendimento)
      .success(function() {
        _alert("Dados atualizados com sucesso!");
      })
      .error(function(data, status) {
        if(status === 404) {
          _alert("Usuário não encontrado!");
        }
      });
  };

  var _mural = function() {
    return !!$scope.mensagem;
  }

  var _alert = function(mensagem, after) {
    $scope.mensagem = mensagem;
    $timeout(function() {
      delete $scope.mensagem;
      after ? after() : null;
    }, 3000);
  };

  $scope.atendimento = atendimento.data;
  $scope.questionario = questionario.data;
  $scope.encerrado = _encerrado;
  $scope.mudarSituacao = _mudarSituacao;
  $scope.voltar = _voltar;
  $scope.salvar = _salvar;
  $scope.mural = _mural;
});
