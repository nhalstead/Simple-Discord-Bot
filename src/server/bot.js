'use strict';

const config = require('../config');
const { timeD, d, e, is_root, c, m, m2ms, s, random, isDM, isBot, timeT } = require('./tools');
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const WebAdmin = require('./webadmin');
const colors = require('colors');
const oneliners = require("./oneliners");

var webServer;
const AuthLink = "https://discordapp.com/oauth2/authorize?&client_id=" + config.discord.appId + "&scope=bot&permissions=0";

console.log("Booting.....".bold);
console.log("Please wait,", random(oneliners.loading));

// Single One and Done Actions after the Bot has been started and checked in with the Discord API Servers.
client.on('ready', () => {
	console.log(` Logged in as ${client.user.tag}! `.underline.black.bgCyan);
	
	if(config.debug) {
		let count = 0;
		client.guilds.map(() => {
			count++;
		});
		console.log("Debug Mode Enabled!".red);
		console.log(("DEBUG START TIME: " + timeD()).red);
		console.log(("Active in " + count + " servers").red);
		d("Add me to your Server! - " + AuthLink);
	}
	console.log(" Bot: Online! ".black.bgCyan);

	if(config.webAdmin.enabled === true){
		console.log(" Web Server Enabled. ".black.bgCyan);
		webServer = WebAdmin(client);
	}

	// Include Addons
	console.log('** Loading Plugins **');
	fs.readdirSync(__dirname + '\\..\\plugins').forEach(function(file) {
		d('Loaded Plugin ' + file);
		if(~file.indexOf('.js')) require(__dirname +'\\..\\plugins\\' + file)(client);
	});

});

client.on("error", console.log);

client.on('message', inMsg => {

	// Selected Auth
	if(is_root(inMsg.author.id)){
		if (inMsg.content.toLowerCase() === 'bot.stop') {
			e(inMsg, "Ok, Bye :crying_cat_face:");
			c("Shutdown Command Recived by " + inMsg.author.username + "#" + inMsg.author.discriminator);
			setTimeout(function(){ process.exit(); }, 1000);
		}

		else if(inMsg.content.toLowerCase().startsWith("bot.status") === true) {
			d("Changing Message");
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
	else if(inMsg.content.toLowerCase() === config.prefix+"h") {
	inMsg.channel.send(
		{
			embed: {
				color: 3447003,
				author: {
					name: client.user.username,
					icon_url: client.user.avatarURL,
				},
				title: "Commands for Simple Discord Bot",
					url: "http://sdbot.ml/",
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
				],
				footer: {
					icon_url: "https://cdn.discordapp.com/attachments/351544209439850507/364349134611677184/e069e0e6720376e0ec7958695e9cbf33.png",
					text: "Simple Discord Bot by: Noah Halstead (@nhalstead)"
				}
			}
		});
	}

	// It's good practice to ignore other bots.
	if(isBot(inMsg)) return;
	else if (!inMsg.guild) { //Checking if it from a server or from a PM
		m(inMsg.author.username + " #" + inMsg.author.discriminator + ": " + inMsg.content); //optional

		if(!is_root(inMsg.author.id)){
			return; // Comment out to Allow for Commands to be Run via the PMs.
		}
	}


	// Text Based Commands
	else if (inMsg.content.toLowerCase() === 'online?') {
		e(inMsg, "Yup, I have been on for " + m2ms(client.uptime));
	}

	else if (inMsg.content.toLowerCase().includes("...")) {
		e(inMsg, "...");
	}

	else if (inMsg.content.toLowerCase().match("(^time|^what time is it|^"+config.prefix+"bottime)")) {
		e(inMsg, "It is " + timeT());
	}

	else if (inMsg.content.toLowerCase().match("meep")) {
		e(inMsg, "...");
	}

	else if(inMsg.content.toLowerCase() === config.prefix+"credit") {
		inMsg.channel.send({
			embed: {
				color: 3447003,
				author: {
					name: "nhalstead",
					icon_url: "https://cdn.discordapp.com/attachments/351544209439850507/364349134611677184/e069e0e6720376e0ec7958695e9cbf33.png"
				}
			}
		});
	}

	else if(inMsg.content.toLowerCase().match("^yes(.?|.{2,32})$") ) {
		e(inMsg, "no");
	}

	else if (inMsg.content.toLowerCase() === config.prefix+'ping') {
		e(inMsg, "PONG!");
	}

});


client.login(config.discord.token)
	.then(function() {
		console.log("Authentication Complete!".green);
	})
	.catch(function(err) {
		console.log('Authentication Failed!'.red);
		c("Error During Authentication!" + " ~ " + JSON.stringify(err));
		client.destroy()
			.then(()=> {
				process.exit();
			});
	});