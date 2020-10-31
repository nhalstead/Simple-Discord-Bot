'use strict';
const config = require('../config');
const {getGuildData, getUserData, setGuildData, setUserData} = require('../server/data');
const {messageValue, deleteMessage, replyInPM, messageAuthor} = require('../server/tools');

module.exports = (client) => {

	client.on('message', inMsg => {
		let msg = messageValue(inMsg);
		let author = messageAuthor(inMsg);

		if (msg.toLowerCase().startsWith("save ")) {
			deleteMessage(inMsg);
			msg = msg.split("save ")[1];
			setUserData(author, "saved", msg);
			replyInPM(inMsg, "Saved, Use `saved` to get what was saved!");
		} else if (msg.toLowerCase() === "saved") {
			deleteMessage(inMsg);
			let sto = getUserData(author, "saved");
			if (sto === undefined) {
				replyInPM(inMsg, "No Message Saved");
			} else {
				replyInPM(inMsg, "Message Saved: `" + sto + "`");
			}
		}

	});

};