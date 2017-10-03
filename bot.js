// Call all needed Packages
var fs = require("fs");
const Discord = require("discord.js");

// Setup Variables 
const client = new Discord.Client();
var config = JSON.parse(fs.readFileSync("config.json"));
console.log("Starting Bot...\n");


// Single One and Done Actions after the Bot has been started and checked in with the Discord API Servers.
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log("Add me to your Server! - https://discordapp.com/oauth2/authorize?&client_id="+config.appId+"&scope=bot&permissions=0");
  console.log("\n---- Bot: Online!\n ");
});


// Event Listeners
client.on('message', inMsg => {
  if (inMsg.content.toLowerCase() === 'ping') {
    //inMsg.reply('Pong!');
	e(inMsg, "PONG!");
  }
  
	
});

// Global Functions
function e(c, i, o = false) {
  if (i !== "" || o === true) { c.channel.send(i); } else { console.log("Called to respond with nothing in the Server Chat"); }
}

client.login(config.token);