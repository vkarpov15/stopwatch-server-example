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
  }).
  // Declare the timer directive
  directive('timer', function() {
    return {
      templateUrl: 'templates/timer.html',
      scope: {
        // If you specify an 'on-time-saved' attribute on a timer,
        // AngularJS will evaluate it every time you save a new time
        onTimeSaved: '&'
      },
      controller: function($scope, Time, $interval) {
        $scope.ms = null;
        $scope.interval = null;
        $scope.display = null;
        $scope.time = null;
        $scope.state = 'INIT';

        // Switch to the 'RUNNING' state, and set an interval to increment
        // the timer.
        $scope.startTimer = function() {
          $scope.ms = $scope.ms || 0;
          $scope.state = 'RUNNING';

          $scope.interval = $interval(function() {
            $scope.ms += 1000;
            var diff = moment.utc($scope.ms);
            $scope.display = diff.format('HH:mm:ss');
          }, 1000);
        };

        // Stop the timer and create a time model so the user can
        // modify the time's 'tag'.
        $scope.stopTimer = function() {
          $scope.state = 'STOPPED';
          $interval.cancel($scope.interval);
          $scope.interval = null;
          if ($scope.time) {
            $scope.time.time = $scope.ms;
          } else {
            $scope.time = { time: $scope.ms };
          }
        };

        // Reset internal state
        $scope.resetTimer = function() {
          $scope.ms = null;
          $scope.display = null;
          $scope.time = null;
        };

        // Persist the time to the server and enter the 'SUCCESS' state.
        $scope.save = function() {
          Time.create($scope.time).$promise.then(function(time) {
            $scope.state = 'SUCCESS';
            $scope.resetTimer();

            // If there's an 'on-time-saved' attribute, evaluate it.
            if ($scope.onTimeSaved) {
              $scope.onTimeSaved({ time: time });
            }
          });
        };
      }
    };
  }).
  directive('timeList', function() {
    return {
      templateUrl: 'templates/time_list.html',
      controller: function($scope, User, Time) {
        // List of colors for badges that display tags
        var COLORS = [
          '#f379ad',
          '#7979f3',
          '#9079f3',
          '#79e5f3',
          '#8979f3'
        ];
        var colorIndex = 0;

        $scope.times = [];
        $scope.tagToColor = {};

        // Load times from the server using 'User' service
        User.times({ id: 'me' }).$promise.then(function(times) {
          times.forEach(function(time) {
            if (time.tag && !$scope.tagToColor[time.tag]) {
              $scope.tagToColor[time.tag] =
                COLORS[colorIndex++ % COLORS.length];
              colorIndex = colorIndex % COLORS.length;
            }
          });
          $scope.times = times.reverse().concat($scope.times);
        });

        // Every time there's a new time, add it to the array
        $scope.$on('NEW_TIME', function(ev, time) {
          $scope.times.unshift(time);
          if (time.tag && !$scope.tagToColor[time.tag]) {
            $scope.tagToColor[time.tag] =
              COLORS[colorIndex++ % COLORS.length];
            colorIndex = colorIndex % COLORS.length;
          }
        });

        // Compute the string to display
        $scope.display = function(time) {
          return moment.utc(time).format('HH:mm:ss');
        };

        // Delete the given time
        $scope.delete = function(time) {
          var index = $scope.times.indexOf(time);
          if (index !== -1) {
            Time.deleteById({ id: time.id });
            $scope.times.splice(index, 1);
          }
        };
      }
    };
  });
