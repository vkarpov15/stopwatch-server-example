// Create the 'core' module and make it depend on 'lbServices'
// 'lbServices' is the module that your 'services.js' file exports
angular.module('core', ['lbServices']).
  // The $user service represents the currently logged in user
  factory('$user', function(User) {
    var ret = {};

    // This function reloads the currently logged in user
    ret.load = function() {
      User.findById({ id: 'me' }, function(v) {
        ret.data = v;
      });
    };

    ret.load();

    return ret;
  }).
  // Declare the user menu directive
  directive('userMenu', function() {
    return {
      templateUrl: 'templates/user_menu.html',
      controller: function($scope, $user) {
        // Expose the $user service to the template HTML
        $scope.user = $user;
      }
    };
  });
