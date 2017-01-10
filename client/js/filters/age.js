angular.module("nafavd").filter("age", function() {
  return function(input){
    var today = new Date();
    var birthday = new Date(input);
    var diff = today - birthday;
    var result = Math.floor((birthday)/31557600000);
    return result;
  };
});
