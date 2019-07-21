'use strict';
const config = require('../config');
const {d, e, c } = require('../server/tools');

const interval = 10; // seconds

var localClient;
var tim; // Timer
var page = 1;
const lastPage = 5;

/**
 * Set the Bot's `Playing` message.
 *
 * @param {string} text Value to set as the `Activity`
 * @param {Object} options Values to Pass to the Client
 *    type: [PLAYING, STREAMING, LISTENING, WATCHING]
 */
const set = (text, options = {}) => {
	localClient.user.setActivity(text, options);
};

const update = () => {
	if(page === 1) {
		set(localClient.users.size + ' Users', { type: 'LISTENING' });
	}
	else if(page === 2){
		set('with ' + localClient.guilds.size + ' servers', { type: 'PLAYING' });
	}
	else if(page === 3){
		set('Johnny 5 is alive!', { type: 'WATCHING' });
	}
	else if(page === 4){
		set('No, I am not on Discord', { type: 'WATCHING' });
	}
	else if(page === 5){
		set('Testing123', { type: 'LISTENING' });
	}

	page++; // Get Ready for the next Page.
	if(page > lastPage) {
		page = 1; // At the End of the List, Reset
	}
};


module.exports = function(client) {
	localClient = client;
	tim = setInterval(update, interval*1000);
	update();

};