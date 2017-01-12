angular.module("nafavd").directive("maskPhone", function($filter) {
  return {
    require: "ngModel",
    link: function(scope, element, attrs, controller) {
      var _cleanPhone = function(phone) {
        return phone.replace(/[^0-9]+/g, "");
      };
      var _formatPhone = function (phone) {
        phone = _cleanPhone(phone);
        if(phone.length > 2) {
          phone = "("+ phone.substring(0, 2) + ") " + phone.substring(2);
        }
        if(phone.length > 9 && phone.length < 15) {
          phone = phone.substring(0, 9)  + "-" + phone.substring(9, 14);
        }
        if(phone.length === 15) {
          phone = $filter("phone")(_cleanPhone(phone));
        }
        return phone;
      };

      element.bind("keyup", function() {
        controller.$setViewValue(_formatPhone(controller.$viewValue));
        controller.$render();
      });

      controller.$parsers.push(function(value) {
        if(value.length >= 14) {
          return _cleanPhone(value);
        }
      });

      controller.$formatters.push(function(value) {
        return $filter("phone")(_cleanPhone(value));
      });
    }
  };
});
