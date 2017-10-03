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
  client.user.setGame('Offline!')
});


// Event Listeners
client.on('message', inMsg => {
  // It's good practice to ignore other bots.
  if(inMsg.author.bot) return;
  
  if (inMsg.content.toLowerCase() === 'ping') {
    e(inMsg, "PONG!");
  }
  
  if (inMsg.content.toLowerCase() === 'online?') {
    e(inMsg, "Yup, I have been on for " + m2ms(client.uptime));
  }
  
  // Other Stuff
  if (inMsg.content.toLowerCase() === 'hello') {
    e(inMsg, "Hi");
  }
  
  if (inMsg.content.toLowerCase() === 'i hate you') {
    c("Sent Message to " + inMsg.author.username);
    s(inMsg, "Can we be Friends?");
  }

  
});

// Global Functions
  function e(c, i, o = false) {
    if (i !== "" || o === true) { c.channel.send(i); } else { console.log("Called to respond with nothing in the Server Chat"); }
  }
  function s(c, i) { if (i !== "") { c.author.send(i); } }
  function c(m){ console.log("INFO: " + m); }

  // https://stackoverflow.com/a/21294619
  function m2ms(i) {
    var m = Math.floor(i / 60000);
    var s = ((i % 60000) / 1000).toFixed(0);
    return m + ":" + (s < 10 ? '0' : '') + s;
  }


client.login(config.token);