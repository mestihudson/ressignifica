angular.module("Resignifica").filter("age", function() {
  return function (input, format) {
    return (format ? moment(input, format) : moment(input)).fromNow(true).replace(moment.localeData()._relativeTime.yy.replace("%d", ""), "");
  };
});
