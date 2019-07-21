'use strict';
const config = require('../config');
const {messageValue, deleteMessage, replyInPM } = require('../server/tools');

module.exports = function(client) {
	client.on('message', inMsg => {
		let msg = messageValue(inMsg);

		if(msg.toLowerCase() === config.prefix+"botuser") {
			deleteMessage(inMsg);
			replyInPM(inMsg,{
				embed: {
					color: 3447003,
					author: {
						name: client.user.username,
						icon_url: client.user.avatarURL,
					}
				}
			});
		}

	});
};