'use strict';
const {messageValue, deleteMessage, reply } = require('../server/tools');
const AuthLink = "https://discordapp.com/oauth2/authorize?client_id={{appId}}&scope=bot&permissions=0";

module.exports = function(client, adapter) {
	let {getPrefix, getBotId} = adapter;

	client.on('message', inMsg => {
		let msg = messageValue(inMsg);

		if(msg.toLowerCase() === getPrefix()+"join") {
			deleteMessage(inMsg);
			reply(inMsg, "Sure, Join the bot to your server from this link!\n" + AuthLink.replace('{{appId}}', getBotId()));
		}

	});
};