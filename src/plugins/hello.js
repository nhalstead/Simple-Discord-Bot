'use strict';
const config = require('../config');
const {messageValue, reply, random } = require('../server/tools');


/**
 * Hellos in a few different english ways, then in
 *  a few other languages.
 *
 * @link https://www.babbel.com/en/magazine/how-to-say-hello-in-10-different-languages/
 */
const hellos = [
	"Hi",
	"Hello",
	"Meep",
	"Greetings",
	"Hey there.",
	"What’s up?",
	"What’s happenin’?",
	"Yo!",

	"Bonjour", // French
	"Hola", // Spanish
	"Zdravstvuyte", // Russian
	"Nǐn hǎo", // Chinese
	"Guten Tag", // German
	"Anyoung haseyo", // Korean
	"Goddag", // Dansih
	"Shalom", // Hebrew
	"God dag" // Norwegian, Swedish
];

module.exports = function(client) {
	client.on('message', inMsg => {
		let msg = messageValue(inMsg).toLowerCase();

		if(msg.match("(^hello|^hi|^yo|^sup|^anyone on)")) {
			reply(inMsg, random(hellos));
		}

	});
};