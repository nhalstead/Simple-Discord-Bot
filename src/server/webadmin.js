const fs = require("fs");
const time = require("moment");
const colors = require('colors');
const express = require('express');
const app = express();
const config = require('../config');
const Promise = require('bluebird');
const { getServers, getServerBundle } = require('./actions.js');

module.exports = function(client){

	app.get('/', (req, res) => {
		res.send('No Data Response.');
	});

	/**
	 * Get Servers that the bot is in.
	 */
	app.get('/guilds', (req, res) => {
		let serverList = getServers(client);
		res.json(serverList);
	});

	/**
	 * Get the Channels and Users the bot sees
	 *  in a given server.
	 */
	app.get('/guilds/:serverId', (req, res) => {
		let serverList = getServerBundle(client, req.params.serverId);
		res.json(serverList);
	});



	let port = config.webAdmin.port || 8898;
	app.listen(port,  ()=> {

		console.log(`WebAdmin Port Running on port ${port}`);
	})
};