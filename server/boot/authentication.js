var loopback = require('loopback');

module.exports = function enableAuthentication(server) {
  // enable authentication
  server.enableAuth();

  server.middleware('auth', loopback.token({
    model: server.models.accessToken,
    currentUserLiteral: 'me'
  }));
};
