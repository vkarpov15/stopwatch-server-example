(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/time_list.html",
    "<div>\n" +
    "  <div class=\"time\" ng-repeat=\"time in times\">\n" +
    "    <span class=\"time-delete\" ng-click=\"delete(time)\">\n" +
    "      X\n" +
    "    </span>\n" +
    "    {{display(time.time)}}\n" +
    "    <span ng-if=\"time.tag\"\n" +
    "          class=\"time-tag\"\n" +
    "          ng-style=\"{ 'background-color': tagToColor[time.tag] }\">\n" +
    "      {{time.tag}}\n" +
    "    </span>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/timer.html",
    "<div class=\"timer\">\n" +
    "  <div class=\"timer-display\">\n" +
    "    {{display || '00:00:00'}}\n" +
    "  </div>\n" +
    "  <div>\n" +
    "    <button ng-show=\" state === 'INIT' ||\n" +
    "                      state === 'STOPPED' ||\n" +
    "                      state === 'SUCCESS'\"\n" +
    "            ng-click=\"startTimer()\">\n" +
    "      Start\n" +
    "    </button>\n" +
    "    <button ng-show=\"state === 'RUNNING'\" ng-click=\"stopTimer()\">\n" +
    "      Stop\n" +
    "    </button>\n" +
    "    <button class=\"reset-button\"\n" +
    "            ng-show=\"state === 'STOPPED'\"\n" +
    "            ng-click=\"resetTimer()\">\n" +
    "      Reset\n" +
    "    </button>\n" +
    "  </div>\n" +
    "  <div class=\"save-time\" ng-show=\"state === 'STOPPED'\">\n" +
    "    <div>\n" +
    "      <input  type=\"text\"\n" +
    "              ng-model=\"time.tag\"\n" +
    "              placeholder=\"Time tag (e.g. '200m')\">\n" +
    "    </div>\n" +
    "    <button ng-click=\"save()\">\n" +
    "      Save\n" +
    "    </button>\n" +
    "  </div>\n" +
    "  <div class=\"success-message\" ng-show=\"state === 'SUCCESS'\">\n" +
    "    Saved Successfully!\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/user_menu.html",
    "<div>\n" +
    "  <div class=\"user-data\" ng-show=\"user.data\">\n" +
    "    <div>\n" +
    "      Welcome, {{user.data.username}}\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"login\" ng-show=\"!user.data\">\n" +
    "    <a href=\"/auth/facebook\">\n" +
    "      <img src=\"//i.stack.imgur.com/LKMP7.png\">\n" +
    "    </a>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
})();
