'use strict';
const config = require('../config');
const {d, isDM } = require('../server/tools');

module.exports = function(client) {

	client.on('message', inMsg => {
		if(inMsg.author.id !== config.discord.appId){
			if(isDM(inMsg)) {
				d('(Private) ' + inMsg.author.id + ` <${inMsg.author.username}>` + ': ' + inMsg.content);
			}
			else {
				d(inMsg.author.id + ` <${inMsg.author.username}>` + ': ' + inMsg.content);
			}
		}
	});

};