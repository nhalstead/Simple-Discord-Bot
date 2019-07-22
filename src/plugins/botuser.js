'use strict';
const config = require('../config');
const {prefix} = require("../config");
const {messageValue, deleteMessage, replyInPM } = require('../server/tools');

module.exports = (client) => {

	client.on('message', inMsg => {
		let msg = messageValue(inMsg);

		if(msg.toLowerCase() === config.prefix+"botuser") {
			deleteMessage(inMsg);
			replyInPM(inMsg,{
				embed: {
					color: 3447003,
					messageAuthor: {
						name: client.user.username,
						icon_url: client.user.avatarURL,
					}
				}
			});
		}
	});

};