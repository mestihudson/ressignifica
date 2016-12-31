angular.module("nafavd").factory("AutenticacaoService", function($http, SessaoService) {
  var _cache = function() {
    SessaoService.set("autenticado", true);
  };
  var _uncache = function() {
    SessaoService.unset("autenticado");
  };
  var _erro = function(response) {

  };
  var _sanitize = function(credenciais) {
    return {
      email: $sanitize(credenciais.email),
      senha: $sanitize(credenciais.senha)
    };
  };
  return {
    entrar: function(credenciais) {
      return $http.post("/autenticacao/entrar", _sanitize(credenciais))
        .success(_cacheSession)
        .error(_erroAutenticacao);
    },
    sair: function() {
      return $http.get("/autenticacao/sair")
        .success(_uncache);
    },
    autenticado: function() {
      return SessaoService.get("autenticado");
    }
  };
});
