const _ = require('lodash');
const { DMChannel, GroupDMChannel } = require("discord.js");
const logger = require("../config/logger");

module.exports = function (client, webServer, config) {

	return function (pluginName, pluginPath) {
		return {
			/**
			 * Add Command to the Help Index
			 *
			 */
			addHelpIndex: (command, textDescription) => {
				// helpIndex[pluginName][] = {
				//  command,
				//  desc: textDescription
				// }
			},

			/**
			 * Triggered when a member joins the server
			 */
			onMemberJoin: (cb) => {
				return client.on('guildMemberAdd', cb);
			},

			/**
			 * Triggered when a member leaves the server.
			 */
			onMemberRemove: (cb) => {
				return client.on('guildMemberRemove', cb);
			},

			/**
			 * Sets the bot status label
			 *
			 * @param {string} text Message to palce for the bot status
			 * @param {string} type Mode to set for the status
			 *        type: [PLAYING, STREAMING, LISTENING, WATCHING]
			 * @return Promise
			 */
			setBotStatus: (text, type = '') => {
				type = type.toUpperCase();
				if (!["PLAYING", "STREAMING", "LISTENING", "WATCHING"].includes(type)) {
					type = 'PLAYING';
				}
				return client.user.setActivity(text, {type});
			},

			/**
			 * Adds a route to the WebServer
			 */
			onRoute: (method, path, cb) => {
				method = method.toLowerCase();
				// The route is one of the following methods, and is not in the root of `/_plugin`
				if (['get', 'post', 'put', 'delete'].includes(method) && !['', '/'].includes(path)) {
					webServer[method]('/_plugin' + path, (req, res) => {
						cb(req, res)
					});
				}
			},

			/**
			 * On Message, Easy Function to interact and use messages.
			 * The onMessage method will reject messages that are from bots.
			 *
			 * @param {function} cb Callback for the function
			 */
			onMessage: (cb) => {
				client.on("message", inMsg => {
					if (inMsg.author.bot === true) return;

					let props = {
						id: inMsg.id,
						content: inMsg.content,
						message: inMsg,
						user: inMsg.author,
						username: inMsg.author.username,
						server: inMsg.guid, // If its in a Server
						channel: inMsg.channel,
						url: inMsg.url,
						attachments: inMsg.attachments,
						react: (emoji) => {
							return inMsg.react(emoji)
						},
						pin: () => {
							return inMsg.pin()
						},
						unpin: () => {
							return inMsg.unpin()
						},
						viaWebhook: !!(inMsg.webhookID),
						hasAttachments: (inMsg.attachments.array().length !== 0),
						isDm: (inMsg.channel instanceof DMChannel || inMsg.channel instanceof GroupDMChannel),
						del: () => {
							(inMsg.deletable) ? inMsg.delete() : false
						},
						reply: (response, options) => {
							return inMsg.channel.send(response, options);
						},
						pm: (response, options) => {
							return inMsg.author.send(response, options);
						}
					}
					cb(props)
				})
			},

			/**
			 * Adds a route to the WebServer that validates the request against the stored secrets.
			 *
			 */
			onAuthenticatedRoute: (method, path, cb) => {
				if (!webServer) return false;

				method = method.toLowerCase();
				// The route is one of the following methods, and is not in the root of `/_plugin`
				if (['get', 'post', 'put', 'delete'].includes(method) && !['', '/'].includes(path)) {
					webServer[method]('/_plugin' + path, (req, res) => {
						// Do Checks to see if the API Key is in the config file.
						if (req.query.secret && config.webAdmin.apiKeys.includes(req.query.secret)) {
							// Call normal function, Key Valid
							return cb(req, res)
						} else {
							// Failed, 401 no token or it is not valid.
							if (req.query.secret) {
								console.log("Failed Auth with secret:", req.query.secret);
							}
							return res.status(401).json({
								success: false,
								message: "Failed Authentication, Please check your configuration and try again."
							});
						}
					});
				}
			},

			/**
			 * Returns the Server Count
			 *
			 * @return int Server Count
			 */
			getTotalServers: () => {
				let count = 0;
				client.guilds.map(() => {
					count++;
				});
				return count;
			},

			/**
			 * Get Config
			 * Returns the config file data without the discord secret data.
			 *
			 * @return {object} Config File Data
			 */
			getConfig: () => {
				return _.omit(config, ['discord']);
			},

			/**
			 * Get Bot Prefix
			 * Returns the bot prefix
			 *
			 * @return {string} Prefix for the bot specific commands
			 */
			getPrefix: () => {
				return config.prefix;
			},

			/**
			 * Get Bot Id
			 * Returns the bot app Id
			 *
			 * @return {string} Bot Id
			 */
			getBotId: () => {
				return config.discord.appId;
			},

			/**
			 * Log
			 *
			 * @param {string} message Message to Log
			 */
			log: (message) => {
				logger.debug(pluginName + ": " + message);
			}

		};
	}

}