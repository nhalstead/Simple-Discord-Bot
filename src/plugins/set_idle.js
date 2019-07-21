'use strict';
const config = require('../config');
const {d, e, c } = require('../server/tools');

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