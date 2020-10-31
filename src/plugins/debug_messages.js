'use strict';
const config = require('../config');
const {isDM} = require('../server/tools');
const logger = require("../config/logger");

module.exports = function(client) {

	client.on('message', inMsg => {
		if(inMsg.author.id !== config.discord.appId){
			if(isDM(inMsg)) {
				logger.debug('(Private) ' + inMsg.author.id + ` <${inMsg.author.username}>` + ': ' + inMsg.content);
			}
			else {
				logger.debug(inMsg.author.id + ` <${inMsg.author.username}>` + ': ' + inMsg.content);
			}
		}
	});

};