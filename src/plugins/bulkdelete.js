'use strict';
const config = require('../config');
const {prefix} = require("../config");
const {messageValue, deleteMessage, reply} = require('../server/tools');

const max = 100;
const simple = 10;

module.exports = (client, adapter) => {

	client.on('message', inMsg => {
		let msg = messageValue(inMsg);

		if (msg.toLowerCase().startsWith(config.prefix + "delete")) {
			const msgT = msg.split(config.prefix + "delete ")[1];

			if (msgT === undefined || msgT === "") {
				// No Number Defined, default to 10
				inMsg.channel.bulkDelete(simple)
					.catch((err) => {
						adapter.log("Failed to process Bulk Delete", err.message)
						reply(inMsg, err.message)
					});
			} else {
				if (isNaN(parseInt(msgT))) {
					reply(inMsg, "Ooof, Sorry! `" + msgT + "` is not a number!");
				} else {
					let count = parseInt(msgT);
					count++; // Add one to delete the last message as well.
					if (count > max) {
						// Hard Max Reset, REST API is 100.
						count = max;
					}
					// You can only bulk delete messages that are under 14 days old.
					inMsg.channel.bulkDelete(count)
						.catch((err) => {
							adapter.log("Failed to process Bulk Delete", err.message)
							reply(inMsg, err.message)
						});
				}
			}

		}
	});

};