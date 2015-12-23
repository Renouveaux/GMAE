
module.exports = function($rootScope, configService){

	var socket = require('socket.io-client')(configService.SOCKET);

	function listenerExists(eventName) {
		return socket.hasOwnProperty("$events") && socket.$events.hasOwnProperty(eventName);
	};

	return {
		connected: function () {
			return socket != null;
		},
		on: function (eventName, callback) {
			if (!listenerExists(eventName)) {
				socket.on(eventName, function () {
					var args = arguments;
					$rootScope.$apply(function () {
						callback.apply(socket, args);
					});
				});
			}
		},
		emit: function (eventName, data, callback) {
			socket.emit(eventName, data, function () {
				var args = arguments;
				$rootScope.$apply(function () {
					if (callback) {
						callback.apply(socket, args);
					}
				});
			});
		},
		join: function(roomName, callback) {
			socket.join(roomName, function(){
				var args = arguments;
				$rootScope.$apply(function () {
					if (callback) {
						callback.apply(socket, args);
					}
				});
			});
		}
	};

};