const _ = require('lodash');

const getEnvConfig = () => {
	if(!process.env.NODE_ENV){
		return require('./default');
	}
	else {
		// Load by NODE_ENV tag
		try {
			return require('./' + process.env.NODE_ENV)
		}
		catch (e) {
			console.error("Failed to load ENV Config: " + './' + process.env.NODE_ENV);
			return {};
		}
	}
};

module.exports = _.extend(
	{
		prefix: "sdb",
		debug: process.env.DEBUG_LOG || false,
		pmmessage: false,
		webAdmin: {
			enabled: process.env.WEBADMIN || false,
			apiKeys: [],
			port: 8898
		},
		discord: {
			appId: process.env.DISCORD_APPID || "",
			token: process.env.DISCORD_TOKEN || ""
		}
	},
	getEnvConfig(),
);
