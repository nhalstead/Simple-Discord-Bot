'use strict';
const config = require('../config');
const {d, e, c, messageAuthor, messageValue, isDM } = require('../server/tools');

module.exports = function(client) {

	client.on('message', inMsg => {
		if(messageAuthor(inMsg).id !== config.discord.appId){
			if(isDM(inMsg)) {
				d('(Private) ' + messageAuthor(inMsg).id + ': ' + messageValue(inMsg));
			}
			else {
				d(messageAuthor(inMsg).id + " " + inMsg.content);
			}
		}
	});

};