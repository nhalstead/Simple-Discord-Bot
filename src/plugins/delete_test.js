'use strict';
const config = require('../config');
const {messageValue, deleteMessage } = require('../server/tools');

module.exports = function(client) {

	client.on('message', inMsg => {
		let msg = messageValue(inMsg);

		if(msg.toLocaleLowerCase() == "testing") {
			deleteMessage(inMsg);
		}

	});

};