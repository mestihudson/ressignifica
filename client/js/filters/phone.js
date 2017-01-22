angular.module("Ressignifica").filter("phone", function() {
  return function(input){
    input = input.split("");
    var code = input.splice(0,2).join("");
    var suffix = input.reverse().splice(0,4).reverse().join("");
    var preffix = input.reverse().join("");
    return "(" + code + ") " + preffix + "-" + suffix;
  };
});
