angular.module("Ressignifica").factory("QuestionarioService", function($http, config){
  return {
    list: function() {
      return $http.get(config.BASE_URL + "/questionarios");
    }
  };
});
