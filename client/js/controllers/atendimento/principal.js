angular.module("Resignifica").controller("AtendimentoPrincipalController", function($scope, atendimentos, $location, AtendimentoService, $timeout, $route) {
  var _detalhes = function(id) {
    $location.path("/atendimento/" + id);
  };

  var _novo = function() {
    $location.path("/atendimento");
  };

  var _remover = function(atendimento) {
    if(confirm("Tem certeza que deseja remover o atendimento ''" + atendimento.nome + "''?")) {
      AtendimentoService.delete(atendimento)
        .success(function() {
          _alert("Removendo '" + atendimento.nome + "' ...", function() {
            $route.reload();
          });
        })
        .error(function(data, status) {
          if(status === 404) {
            _alert("Usuário não encontrado!");
          }
        });
    }
  };

  var _alert = function(mensagem, after) {
    $scope.mensagem = mensagem;
    $timeout(function() {
      delete $scope.mensagem;
      after ? after() : null;
    }, 3000);
  };

  var _mural = function() {
    return !!$scope.mensagem;
  };

  $scope.atendimentos = atendimentos.data;
  $scope.detalhes = _detalhes;
  $scope.novo = _novo;
  $scope.remover = _remover;
  $scope.mural = _mural;
});
