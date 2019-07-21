'use strict';
const config = require('../config');
const {messageValue, deleteMessage, reply } = require('../server/tools');
const AuthLink = "https://discordapp.com/oauth2/authorize?&client_id=" + config.discord.appId + "&scope=bot&permissions=0";

module.exports = function(client) {
	client.on('message', inMsg => {
		let msg = messageValue(inMsg);

		if(msg.toLowerCase() === config.prefix+"join") {
			deleteMessage(inMsg);
			reply(inMsg, "Sure, Join the bot to your server from this link!\n" + AuthLink);
		}

	});
};