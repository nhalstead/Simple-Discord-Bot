'use strict';
import config from "../config";
import {messageValue, deleteMessage, replyInPM} from "../server/tools";

module.exports = (client) => {

	client.on('message', inMsg => {
		let msg = messageValue(inMsg);

		if (msg.toLowerCase() === config.prefix + "botuser") {
			replyInPM(inMsg, {
				embed: {
					plainText: "About Bot Command",
					title: "About Bot Command",
					description: "Nothing new. Just a command about the bot.",
					author: {
						name: client.user.username,
						icon_url: client.user.avatarURL,
					},
					color: 3447003
				}
			})
				.then(() => {
					// Wait until the message is sent.
					deleteMessage(inMsg);
				});
		}
	});

};