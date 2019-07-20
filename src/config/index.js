const _ = require('lodash');

module.exports = _.extend(
	{
		prefix: "sdb",
		debug: false,
		pmmessage: false,
		webAdmin: {
			enabled: false,
			apiKeys: [],
			port: 8898
		},
		discord: {
			appId: "",
			token: ""
		}
	},
	(!process.env.NODE_ENV) ? require('./default') : require('./' + process.env.NODE_ENV),
);
