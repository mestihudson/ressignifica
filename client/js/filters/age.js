angular.module("nafavd").filter("age", function() {
  return function (input, format) {
    if(format) {
      input = moment(input, format)._d.getTime();
    }
    return Math.floor((new Date() - new Date(input))/31557600000);
  };
});
