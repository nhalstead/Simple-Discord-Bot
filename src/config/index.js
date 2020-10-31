const _ = require('lodash');
const dotenv = require("dotenv");
const fs = require("fs");
const {valueNull} = require("../fn");

if (fs.existsSync(".env")) {
	dotenv.config({path: ".env"})
} else {
	console.log("Loading defaults");
}

module.exports = {
	prefix: process.env.BOT_PREFIX || "sdb",
	debug: valueNull(process.env.DEBUG_LOG, false),
	pmmessage: false,
	webAdmin: {
		enabled: process.env.WEBADMIN || true,
		apiKeys: [],
		port: 8898
	},
	discord: {
		appId: process.env.DISCORD_APPID || "",
		token: process.env.DISCORD_TOKEN || ""
	}
};
