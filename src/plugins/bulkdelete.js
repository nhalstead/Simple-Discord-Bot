'use strict';
const config = require('../config');
const {prefix} = require("../config");
const {messageValue, deleteMessage, reply } = require('../server/tools');

const max = 100;
const simple = 10;

module.exports = (client) => {

	client.on('message', inMsg => {
		let msg = messageValue(inMsg);

		if(msg.toLowerCase().startsWith(config.prefix+"delete")) {
			const msgT = msg.split(config.prefix+"delete ")[1];

			if(msgT === undefined || msgT === ""){
				// No Number Defined, default to 10
				inMsg.channel.bulkDelete(simple);
			}
			else {
				if(isNaN(parseInt(msgT))) {
					reply(inMsg, "Ooof, Sorry! `" + msgT + "` is not a number!");
				}
				else {
					let count = parseInt(msgT);
					count++; // Add one to delete the last message as well.
					if(10 > max) {
						// Hard Max Reset
						count = max;
					}
					inMsg.channel.bulkDelete(count);
				}
			}

		}
	});

};