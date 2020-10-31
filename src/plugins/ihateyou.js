'use strict';
const config = require('../config');
const {messageValue, reply, replyInPM} = require('../server/tools');


module.exports = function (client) {
	client.on('message', inMsg => {
		let msg = messageValue(inMsg).toLowerCase();

		if (msg.match("^i hate you((.?|.{2,32})$)")) {
			reply(inMsg, "Are you sure? I'd Like to be friends!");

			// Send a PM to be creepy, Asking to be Friends
			setTimeout(() => {
				replyInPM(inMsg, "Can we be Friends?")
			}, 3000);
		}

	});
};