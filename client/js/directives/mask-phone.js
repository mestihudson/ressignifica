angular.module("Ressignifica").directive("maskPhone", function($filter) {
  return {
    require: "ngModel",
    link: function(scope, element, attrs, controller) {
      var _unmask = function(phone) {
        return phone ? phone.replace(/[^0-9]+/g, "") : "";
      };

      var _mask = function (phone, mask) {
        phone = _unmask(phone);
        if(phone.length > 2) {
          phone = "("+ phone.substring(0, 2) + ") " + phone.substring(2);
        }
        if(phone.length > 9 && phone.length < 15) {
          phone = phone.substring(0, 9)  + "-" + phone.substring(9, 14);
        }
        if(phone.length === 15) {
          phone = $filter("phone")(_unmask(phone));
        }
        return phone;
      };

      element.bind("keyup", function() {
        controller.$setViewValue(_mask(controller.$viewValue, attrs.maskPhone));
        controller.$render();
      });

      controller.$parsers.push(function(value) {
        if(value.length >= 14) {
          return _unmask(value);
        }
      });

      controller.$formatters.push(function(value) {
        return value ? $filter("phone")(_unmask(value)) : "";
      });
    }
  };
});
