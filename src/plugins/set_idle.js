'use strict';
const config = require('../config');

module.exports = function(client) {

	let u = client.user; // {ClientUser}
	if(u !== undefined) {
		// {PresenceStatus}
		// online, idle, offline, dnd
		u.setStatus("idle");
	}
	else {
		console.log("Client User undefined")
	}

};