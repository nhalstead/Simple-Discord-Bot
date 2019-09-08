const _ = require('lodash');
const config = require('../../config');
const Promise = require('bluebird');

/**
 * Get Servers from Client
 *
 * @param {Client} client Discord.JS Bot Instance
 * @return {Object} List of the Server Info
 */
const getServers = (client) => {
	let serverList = [];
	client.guilds.map((server) => {
		// Save GUILDs to the map.
		serverList.push({
			serverId: server.id,
			serverName: server.name,
			serverIcon: server.iconURL,
			members: server.memberCount,
		});
	});
	return serverList;
};

/**
 *
 *
 * @param {Client} client Discord.JS Bot Instance
 * @param {number} serverId
 * @return {Object}
 */
const getServerBundle = (client, serverId) => {
	let server = getServerFromList(client, serverId);

	if(server === false){
		return [];
	}

	let afkChannelId = [];
	if(server.afkChannelID !== undefined) {
		afkChannelId = server.afkChannelID;
	}

	let result = {
		id: server.id,
		name: server.name,
		icon: server.iconURL,
		memberCount: server.memberCount,
		afkChannelId: afkChannelId,
		channels: getServerChannels(client, server),
		members: getServerMemebers(client, server),
		roles: getServerRoles(client, server)
	};
	return result;
};

/**
 * Get Server from a Server (Collection<Guilds>) List
 *
 * @param {Client} client Discord.JS Bot Instance
 * @param {number} serverId
 * @return {Guild|Boolean} Discord.js Guild Object (Server Object)
 */
const getServerFromList = (client, serverId) => {
	let server = client.guilds.get(serverId);
	if(server === undefined){
		return false
	}
	return server;
};

/**
 * Get Server Channels
 *
 * @param {Client} client Discord.JS Bot Instance
 * @param {Guild} server
 * @return {Object} Channels that the bot can see
 */
const getServerChannels = (client, server) => {
	let channels = [];
	server.channels.map((channel) => {
		channels.push({
			id: channel.id,
			name: channel.name,
			position: channel.position,
			type: channel.type,
			createdTimestamp: channel.createdTimestamp,
			parentId: channel.parentID
		});
	});

	channels = _.sortBy(channels, "position");
	return channels;
};

/**
 * Get Server Memebers
 *
 * @param {Client} client Discord.JS Bot Instance
 * @param {Guild} server
 * @return {Object} Members that the bot can see
 */
const getServerMemebers = (client, server) => {
	let members = [];

	server.members.map((member) => {
		let role = [];
		if(member.highestRole !== undefined){
			role = {
				id: member.highestRole.id,
				name: member.highestRole.name,
				color: member.highestRole.hexColor,
				calculatedPosition: member.highestRole.calculatedPosition,
				position: member.highestRole.position,
				mentionable: member.highestRole.mentionable
			};
		}

		members.push({
			id: member.id,
			displayName: member.displayName,
			nickname: member.nickname,
			hexColor: member.displayHexColor,
			primaryRole: role
		});
	}); // End .map

	return members;
};

// /**
//  * Get Server Webhooks
//  *
//  * @param {Client} client Discord.JS Bot Instance
//  * @param {Guild} server
//  * @return {Object} Webhooks that the server can see
//  */
// const getChannelWebhooks = (client, server, channel) => {
// 	let webhooks = [];
//
// 	server.webhooks.map((id, webhook) => {
// 		webhooks.push({
// 			id: webhook.id,
// 			avatar: webhook.avatar,
// 			name: webhook.name,
// 			owner: webhook.owner,
// 			channel: webhook.channelID,
// 			token: webhook.token
// 		});
// 	});
//
// 	return webhooks;
// };

/**
 * Get Server Roles
 *
 * @param {Client} client Discord.JS Bot Instance
 * @param {Guild} server
 * @return {Object} Roles that the server can see
 */
const getServerRoles = (client, server) => {
	let roles = [];

	server.roles.map((role) => {
		roles.push({
			id: role.id,
			name: role.name,
			position: role.position,
			calculatedPosition: role.calculatedPosition,
			hexColor: role.hexColor
		});
	});

	roles = _.sortBy(roles, "position");
	return roles;
};

module.exports = {
	getServers,
	getServerBundle

};