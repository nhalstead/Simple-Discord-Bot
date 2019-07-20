const _ = require('lodash');

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
	(!process.env.NODE_ENV) ? require('./default') : require('./' + process.env.NODE_ENV),
);
