angular.module("nafavd").directive("maskDate", function($filter) {
  return {
    require: "ngModel",
    link: function(scope, element, attrs, controller) {
      var _formatDate = function (date) {
        date = date.replace(/[^0-9]+/g, "");
        if(date.length > 2) {
          date = date.substring(0, 2) + "/" + date.substring(2);
        }
        if(date.length > 5) {
          date = date.substring(0, 5)  + "/" + date.substring(5, 9);
        }
        return date;
      };

      element.bind("keyup", function() {
        controller.$setViewValue(_formatDate(controller.$viewValue));
        controller.$render();
      });

      controller.$parsers.push(function(value) {
        if(value.length === 10) {
          // var a = value.split("/")
          // return new Date(a[2], a[1]-1, a[0]).getTime();
          return moment(value, "DD/MM/YYYY")._d.getTime();
        }
      });

      controller.$formatters.push(function(value) {
        return $filter("date")(value, "dd/MM/yyyy");
      });
    }
  };
});
