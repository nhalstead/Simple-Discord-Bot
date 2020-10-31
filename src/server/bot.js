'use strict';

const config = require('../config');
const {timeD, d, broadcastToChannel, is_root, c, messageEvent, m2ms, sendMessagReply, random, isDM, isBot, timeT} = require('./tools');
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const path = require("path");
const WebAdmin = require('./webadmin');
const oneLiners = require("./oneLiners");
const adapter = require("./adapter");
const logger = require("../config/logger");

let webServer; // WebServer Instance
const AuthLink = "https://discordapp.com/oauth2/authorize?client_id=" + config.discord.appId + "&scope=bot&permissions=0";

logger.debug("Booting.....");
logger.debug("Please wait, " + random(oneLiners.loading));

// Single One and Done Actions after the Bot has been started and checked in with the Discord API Servers.
client.on('ready', () => {
	logger.info(`Logged in as ${client.user.tag}!`);

	if (config.debug) {
		let count = 0;
		client.guilds.map(() => {
			count++;
		});
		logger.debug("Debug Mode Enabled!");
		logger.debug("Active in " + count + " servers");
		logger.debug("Add me to your Server! - " + AuthLink);
	}
	logger.debug("Bot: Online!");

	if (config.webAdmin.enabled === true) {
		logger.info("Web Server Enabled.");
		webServer = WebAdmin(client);
	}

	// Include Addons
	logger.debug('** Loading Plugins **');
	let adapterInterface = adapter(client, webServer, config);
	fs.readdirSync(path.join(__dirname, '..', 'plugins')).forEach((file) => {
		logger.debug('Loaded Plugin ' + file);
		let loadPath = path.join(__dirname, '..', 'plugins', file);
		let instance = adapterInterface(file, loadPath)
		if (~file.indexOf('.js')) require(loadPath)(client, instance);
	});

});

client.on("error", logger.error);

client.on('message', inMsg => {

	// Selected Auth
	if (is_root(inMsg.author.id)) {
		if (inMsg.content.toLowerCase() === 'bot.stop') {
			broadcastToChannel(inMsg, "Ok, Bye :crying_cat_face:");
			logger.debug("Shutdown Command Recived by " + inMsg.author.username + "#" + inMsg.author.discriminator);
			setTimeout(function () {
				process.exit();
			}, 1000);
		} else if (inMsg.content.toLowerCase().startsWith("bot.status") === true) {
			logger.debug("Changing Message");
			var str = inMsg.content.replace("/^(bot\.status)\s{0,2}/", "");
			client.user.setActivity(str);
			return;
		}
	}

		// else if(inMsg.content.toLowerCase() === 'bot.f') {
		// client.addFriend(inMsg.author.id).then(u => {
		// u.createDM().then(chnl => {
		// chnl.send("A message will go here.")
		// });
		// })
		// }

	// Server Specific Commands
	else if (inMsg.content.toLowerCase() === config.prefix + "h") {
		inMsg.channel.send(
			{
				embed: {
					color: 3447003,
					author: {
						name: client.user.username,
						icon_url: client.user.avatarURL,
					},
					title: "Commands for Simple Discord Bot",
					description: "List of Commands the the Bot Supports",
					fields: [{
						name: "`online?`",
						value: "Tells you the amount of Users detected by the Bot in all of the servers it is on."
					},
						{
							name: "`I hate you!`",
							value: "Messages you letting you know that it wants to be friends with you!"
						},
						{
							name: "`hello`",
							value: "Says Hi back yo you!"
						}
					]
				}
			});
	}

	// It's good practice to ignore other bots.
	if (isBot(inMsg)) return;
	else if (!inMsg.guild) { //Checking if it from a server or from a PM
		messageEvent(inMsg.author.username + " #" + inMsg.author.discriminator + ": " + inMsg.content);

		if (!is_root(inMsg.author.id)) {
			return; // Comment out to Allow for Commands to be Run via the PMs.
		}
	}


	// Text Based Commands
	else if (inMsg.content.toLowerCase() === 'online?') {
		broadcastToChannel(inMsg, "Yup, I have been on for " + m2ms(client.uptime));
	} else if (inMsg.content.toLowerCase().includes("...")) {
		broadcastToChannel(inMsg, "...");
	} else if (inMsg.content.toLowerCase().match("(^time|^what time is it|^" + config.prefix + "bottime)")) {
		broadcastToChannel(inMsg, "It is " + timeT());
	} else if (inMsg.content.toLowerCase().match("meep")) {
		broadcastToChannel(inMsg, "...");
	} else if (inMsg.content.toLowerCase() === config.prefix + "credit") {
		inMsg.channel.send({
			embed: {
				color: 3447003,
				author: {
					name: "nhalstead",
					icon_url: "https://cdn.discordapp.com/attachments/351544209439850507/364349134611677184/e069e0e6720376e0ec7958695e9cbf33.png"
				}
			}
		});
	} else if (inMsg.content.toLowerCase().match("^yes(.?|.{2,32})$")) {
		broadcastToChannel(inMsg, "no");
	} else if (inMsg.content.toLowerCase() === config.prefix + 'ping') {
		broadcastToChannel(inMsg, "PONG!");
	}

});


client.login(config.discord.token)
	.then(function () {
		logger.debug("Authentication Complete!");
	})
	.catch(function (err) {
		logger.debug('Authentication Failed!'.red);
		logger.error("Error During Authentication!" + " ~ " + JSON.stringify(err));
		client.destroy()
			.then(() => {
				process.exit();
			});
	});