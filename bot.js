// Call all needed Packages
var fs = require("fs");
const Discord = require("discord.js");
const time = require("moment");
var colors = require('colors');

// Setup Variables 
var client = new Discord.Client();
var config = JSON.parse(fs.readFileSync("config.json"));
config.debug = true;
var botId = "";
var AuthLink = "https://discordapp.com/oauth2/authorize?&client_id="+config.appId+"&scope=bot&permissions=0";
var owner_whitelist = [
	"329459428304617475"
]
var bootUpGeneral = client.channels.get('364594803482034179');
console.log("Starting Bot...".bold);


// Single One and Done Actions after the Bot has been started and checked in with the Discord API Servers.
client.on('ready', () => {
	console.log(` Logged in as ${client.user.tag}! `.underline.white.bgCyan);
	
	if(config.debug) {
	console.log("\nMODE CHANGE: Debug Mode Enabled!".red);
	console.log(("DEBUG START TIME: " + timeD() + " = " + client.uptime).red);
		d("Add me to your Server! - " + AuthLink);
	}
	console.log("\n ---- Bot: Online!".white.bgCyan);
	client.user.setGame("... Something");
	botId = config.id;
	
	//bootUpGeneral.send("I'm Alive again!");
});

// Event Listeners
	client.on("guildCreate", guild => {
		// This event triggers when the bot joins a guild.
		client.user.setGame(`with ` + client.users.size + ` Users`);
	});

	client.on("guildDelete", guild => {
		// this event triggers when the bot is removed from a guild.
		client.user.setGame(`with ` + client.users.size + ` Users`);
	});


	client.on("error", error => {
		console.log(error);
	});


	client.on('typingStart', (channel, user) => {
		if(channel.guild) {
			d( timeD() +": "+user.username + " #" + user.discriminator + " is typing in " + channel.guild.name + "/" + channel.name);
		}
		else {
			d( timeD() +": "+user.username + " #" + user.discriminator + " is typing in PMs with the Bot (Me)");
		}
	});
	
	
	
	client.on('message', inMsg => {
		// Selected Auth
		if(is_root(inMsg.author.id)){
			if (inMsg.content.toLowerCase() === 'bot.stop') {
				e(inMsg, "Ok, Bye :crying_cat_face:");
				c("Shutdown Command Recived by " + inMsg.author.username + "#" + inMsg.author.discriminator);
				setTimeout(function(){ process.exit(); }, 1000);
			}
			
			else if (inMsg.content.toLowerCase() === 'bot.reload') {
				d("Reloading Config ~ Triggered by: " + inMsg.author.username);
				e(inMsg, ":warning: Reloading Config... :warning:");
				var ds = config.debug;
				config = JSON.parse(fs.readFileSync("config.json"));
				config.debug = ds;
				e(inMsg, ":white_check_mark: Reload Complete! ");
				return;
			}
			
			else if(inMsg.content.toLowerCase().startsWith("bot.status") == true) {
				d("Changing Message");
				var str = inMsg.content.replace("/^(bot\.status)\s{0,2}/", "");
				client.user.setGame(str);
				return;
			}
		
		}
		
		
		if (inMsg.content.toLowerCase() === 'bot.users') {
			client.user.setGame(`with ` + client.users.size + ` Users`);
		}
		else if (inMsg.content.toLowerCase() === 'bot.servers') {
			client.user.setGame(`on ` + client.guilds.size + ` servers`);
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
		inMsg.channel.send({embed: {
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
			
			}});
		}
		
		
		
		// It's good practice to ignore other bots.
		if(inMsg.isPrivate == true) { console.log(`(Private) ${inMsg.author.name}: ${inMsg.content}`); }
		else if(inMsg.author.bot) return;
		else if (!inMsg.guild) { //Checking if it from a server or from a PM
			m(inMsg.author.username + " #" + inMsg.author.discriminator + ": " + inMsg.content); //optional
			//wheretosend.send(message.author.username + ": " + mes); //wheretosend is my variable. Just choose a server and a channel ID
			
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
		
		else if (inMsg.content.toLowerCase().match("(^hello|^hi|^yo|^sup|^anyone on)")) {
			// Uing the Regex I made: https://regex101.com/r/jhfhCa/1
			var a = [
				"Hi",
				"Hola",
				"Hello",
				"Meep"
			];
			e(inMsg, arraygr(a));
		}
		
		else if (inMsg.content.toLowerCase().match("meep")) {
			e(inMsg, "...");
		}
		
		else if (inMsg.content.toLowerCase().match("^i hate you((.?|.{2,32})$)")) {
			// Uing the Regex I made: https://regex101.com/r/5gk2pI/2
			c("Sent Message to " + inMsg.author.username);
			s(inMsg, "Can we be Friends?");
			e(inMsg, "Are you sure? I'd Like to be friends!");
		}
		
		else if(inMsg.content.toLowerCase() === config.prefix+"botuser") {
		inMsg.channel.send({embed: {
				color: 3447003,
			author: {
				name: client.user.username,
				icon_url: client.user.avatarURL
			}
			}});
		}
		
		else if(inMsg.content.toLowerCase() === config.prefix+"credit") {
		inMsg.channel.send({embed: {
				color: 3447003,
			author: {
				name: "nhalstead",
				icon_url: "https://cdn.discordapp.com/attachments/351544209439850507/364349134611677184/e069e0e6720376e0ec7958695e9cbf33.png"
			}
			}});
		}
		
		else if(inMsg.content.toLowerCase().match("^yes(.?|.{2,32})$") ) {
			e(inMsg, "no");
		}
		
		else if(inMsg.content.toLowerCase() === config.prefix+"users") {
			e(inMsg, client.users.size + " users attached to this the Bot. ("+client.guilds.size +" on this Server)");
		}
		
		else if (inMsg.content.toLowerCase() === config.prefix+'ping') {
			e(inMsg, "PONG!");
		}
		
		else if(inMsg.content.toLowerCase() === config.prefix+"servericon") {
			e(inMsg, 'blah');
		}
		
		//Echo the Auth Link to add the bot to your Server
		else if(inMsg.content.toLowerCase() === config.prefix+"sdb") { e(inMsg, AuthLink); }

		
	});


// Global Functions
	function e(c, i, o = false) {
		if (i !== "") { c.channel.send(i); } else { console.log("INFO: Called to respond with nothing, Discord can not take Empty Messages!"); }
	}
	function es(i) { client.sendMessage(i); }
	function s(c, i) { if (i !== "") { c.author.send(i); } }
	function c(m){ console.log("INFO: " + m); }
	function d(m) { if(config.debug === true) { console.log(" DEBUG: ".yellow + m.cyan); }}
	function m(m) { if(config.pmmessage === true) { console.log(" MSG: ".yellow + m.cyan); }}
	function timeD() { return time().format('MMMM Do YYYY, h:mm:ss A'); }
	function timeT() { return time().format('MMM DD h:mm A'); }
	function timeUTC() { return time.duration("12:10:12: PM", "HH:mm:ss: A").asSeconds(); }
	function importJson(f){ return JSON.parse(fs.readFileSync(f)); }
	function is_root(i) { return (owner_whitelist.indexOf(i) > -1); }
	
	// https://stackoverflow.com/a/21294619
	function m2ms(i) {
		var m = Math.floor(i / 60000);
		var s = ((i % 60000) / 1000).toFixed(0);
		return m + ":" + (s < 10 ? '0' : '') + s;
	}
	
	// https://stackoverflow.com/a/24137301
	function arraygr (list) {
		return list[Math.floor((Math.random()*list.length))];
	} 


client.login(config.token)
	.then(function() {
		console.log("Authentication Complete!".green);
	}, function(err) {
		console.log('Authentication Failed!'.red);
		c("Error During Authentication!" + " ~ " + JSON.stringify(err));
		client.destroy()
		process.exit();
	});