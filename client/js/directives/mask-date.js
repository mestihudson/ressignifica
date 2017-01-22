angular.module("Ressignifica").directive("maskDate", function($filter) {
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
          return moment(value, attrs.maskDate.toUpperCase())._d.getTime();
        }
      });

      controller.$formatters.push(function(value) {
        return value ? $filter("date")(value, attrs.maskDate): "";
      });
    }
  };
});
