const fs = require("fs");
const time = require("moment");
const colors = require('colors');
const config = require('../config');
const { DMChannel, TextChannel, GroupDMChannel } = require("discord.js");

module.exports =  {
	/**
	 * Echo to Channel
	 *
	 * @param {Object} channel Channel Object
	 * @param {string} message Message to Send to the Channel
	 */
	e: (channel, message) => {
		if (message !== "" && typeof message == "string") {
			channel.channel.send(message);
		} else {
			console.log("INFO: Called to respond with nothing, Discord can not take Empty Messages!");
		}
	},

	/**
	 * Send Message
	 *
	 * @param {string} message Message to Send
	 */
	es: (message) => {
		client.sendMessage(message);
	},

	/**
	 * Send message in response to Message
	 *
	 * @param {Object} c
	 * @param {string} message Message to send.
	 */
	s: (c, message) => {
		if (message !== "" && typeof message == "string") {
			c.author.send(message);
		}
	},

	/**
	 * Console Log as INFO message
	 *
	 * @param {mixed} message Value to push the console.
	 */
	c: (message) => {
		console.log("INFO:", message);
	},

	/**
	 * Console Log as DEBUG message
	 *  this has a condition for if the env is in Debug Mode
	 *
	 * @param {mixed} message Value to push the console.
	 */
	d: (message) => {
		if (config.debug === true) {
			console.log(" DEBUG:".yellow, message.cyan);
		}
	},

	/**
	 * Console Log as MSG message
	 *  this has a condition for if it should log PM Messages
	 *
	 * @param {mixed} message Value to push the console.
	 */
	m: (message) => {
		if (config.pmmessage === true) {
			console.log(" MSG:".yellow, message.cyan);
		}
	},

	/**
	 *
	 * @return {string}
	 */
	timeD: () => {
		return time().format('MMMM Do YYYY, h:mm:ss A');
	},

	/**
	 *
	 * @return {string} Time in the Given Format
	 */
	timeT: () => {
		return time().format('MMM DD h:mm A');
	},

	/**
	 * Get time in UTC format
	 *
	 * @return {string} Time in the UTC Timezone.
	 */
	timeUTC: () => {
		return time.duration("12:10:12: PM", "HH:mm:ss: A").asSeconds();
	},

	/**
	 * Import JSON from a File
	 *
	 * @param {string} fileLocation File Location that should be read.
	 * @return {Object} Json Object, Or Parse Error
	 */
	importJson: (fileLocation) => {
		try {
			let content = fs.readFileSync(fileLocation);
			return JSON.parse(content);
		} catch (e) {
			d("importJson Error, Error Reading " + fileLocation);
			return false;
		}
	},

	/**
	 * Get User's Level
	 *
	 * @param {Snowflake} id
	 * @return {boolean} If the given user is a root user.
	 */
	is_root: (id) => {
		//return (owner_whitelist.indexOf(di) > -1);
		return false;
	},

	/**
	 *
	 *
	 * @link https://stackoverflow.com/a/21294619
	 * @param {} i
	 * @return {}
	 */
	m2ms: (i) => {
		var m = Math.floor(i / 60000);
		var s = ((i%60000)/1000).toFixed(0);
		return m + ":" + (s < 10 ? '0' : '') + s;
	},

	/**
	 * Array Get Random
	 *
	 * @link https://stackoverflow.com/a/24137301
	 * @param {Object} list Object that has many items in it.
	 * @return {Mixed} Return any Random Element from a List
	 */
	random: (list) => {
		return list[Math.floor((Math.random() * list.length))];
	},

	/**
	 * Is the incoming Message a DM or GroupDM
	 *
	 * @param {Message} message Discord Message
	 * @return {Boolean}
	 */
	isDM: (message) => {
		return (message.channel instanceof DMChannel || message.channel instanceof GroupDMChannel);
	},

	/**
	 * Get the incoming message type
	 *
	 * @param {Message} message Discord Message
	 * @return {String} Message type, Returns String from the constants.js file.
	 */
	messageType: (message) => {
		if(message.channel instanceof DMChannel) {
			return "dm";
		}
		else if (message.channel instanceof GroupDMChannel) {
			return "dm";
		}
		else if (message.channel instanceof TextChannel) {
			return "channel";
		}
		else {
			return "";
		}
	},

	/**
	 * Is incoming message from a bot
	 *
	 * @param {Message} message Discord Message
	 * @return {Boolean} Is the message from a Robot
	 */
	isBot: (message) => {
		return (message.author.bot === true);
	}

};