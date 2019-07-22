const FileDriver = require('./drivers/filestorage');
const path = require('path');


let driverGuilds = new FileDriver(path.resolve(__dirname, "../data/guilds"));
let driverUsers = new FileDriver(path.resolve(__dirname, "../data/users"));

module.exports = {

	/**
	 * Get Data stored in cache for the server (Guild)
	 *
	 * @param {Guild} server Message Object, Used to Lookup data based on the GUILD Id
	 * @param {string} key Key Data to lookup
	 * @param {string|number|Object|Boolean} def Default Value
	 * @return {string|number|Object|Boolean} Data Stored
	 */
	getGuildData: (server, key, def = undefined) => {
		let lookup_token = server.id + "_" + key;
		let result = driverGuilds.get(lookup_token);
		
		if(result === undefined){
			return def;
		}
		else {
			return result;
		}
	},

	/**
	 * Set Data stored in cache for the server (Guild)
	 *
	 * @param {Guild} server Message Object, Used to Lookup data based on the GUILD Id
	 * @param {string} key Key Data to lookup
	 * @param {string|number|Object|Boolean} value Value
	 */
	setGuildData: (server, key, value = undefined) => {
		let lookup_token = server.id + "_" + key;
		driverGuilds.put(lookup_token, value);
	},

	/**
	 * Get Data stored in cache for the given user (GuildMember)
	 *
	 * @param {GuildMember} user Message Object, Used to Lookup data based on the GUILD Id
	 * @param {string} key Key Data to lookup
	 * @param {string|number|Object|Boolean} def Default Value
	 * @return {string|number|Object|Boolean} Data Stored
	 */
	getUserData: (user, key, def = undefined) => {
		let lookup_token = user.id + "_" + key;
		let result = driverUsers.get(lookup_token);

		if(result === undefined){
			return def;
		}
		else {
			return result;
		}
	},

	/**
	 * Set Data stored in cache for the given user (GuildMember)
	 *
	 * @param {GuildMember} user Message Object, Used to Lookup data based on the GUILD Id
	 * @param {string} key Key Data to lookup
	 * @param {string|number|Object|Boolean} value Value
	 */
	setUserData: (user, key, value = undefined) => {
		let lookup_token = user.id + "_" + key;
		driverUsers.put(lookup_token, value);
	}

};