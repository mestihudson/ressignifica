angular.module("nafavd").filter("age", function() {
  return function (input, format) {
    return (format ? moment(input, format) : moment(input)).fromNow(true);
  };
});
