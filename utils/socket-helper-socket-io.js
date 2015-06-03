/**
* Wrapper functionality for socket management
*/
var SocketIo = {}
  , config = require('../config').get();

// http://mattmueller.me/blog/quick-tip-node-js-socket-io-authentication

/**
 * Generates a SocketHelper
 *
 * https://github.com/LearnBoost/Socket.IO/wiki/Configuring-Socket.IO
 *
 * @constructor
 * @param {Object} options
 */
var SocketHelper = function(app, logger) {
    this.initialize(app, config, logger);
};

/**
 * Initializes properties
 *
 * @constructor
 * @param {Object} options
 */
SocketHelper.prototype.initialize = function(app, appConfig, logger) {

  // This would allow Socket.IO to listen on the same port as the server
  SocketIo = require('socket.io').listen(app);
  //SocketIo.set('log level', appConfig.socket_loglevel)
  logger.verbose("Socket.IO listening on port " + appConfig.port);

  SocketIo.sockets.on('connection', function(socket) {
    socket.on('close', function() {
      logger.info('stopping client interval');
    });
  });

};

// Export SocketHelper constructor
module.exports.SocketHelper = SocketHelper;