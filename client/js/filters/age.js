angular.module("nafavd").filter("age", function() {
  return function(input){
    return Math.floor((new Date() - new Date(input))/31557600000);
  };
});
