angular.module("nafavd").controller("AtendimentoPrincipalController", function($scope) {
  $scope.atendimento = {
    "nome": "Pedro",
    "telefone": "999999999",
    "nascimento": new Date(),
    "criadoEm": new Date(),
    "questionamento": {
      "reencaminhamento": "mesmo processo",
      "situacao": "encerrado",
      "encerramento": "faltas",
      "indicacao": "não opinou",
      "relacionamento": "outro"
    }
  };
  $scope.questionamentos = {
    reencaminhamento: ["mesmo processo", "outro processo", "sem informação"],
    situacao: ["concluído", "encerrado"],
    encerramento: ["abandono", "faltas", "não apresentou perfil"],
    indicacao: ["sim", "não", "não opinou"],
    relacionamento: ["mesmo", "outro", "sem", "não opinou"]
  };
});
