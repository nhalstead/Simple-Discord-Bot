'use strict';

const interval = 10; // seconds

var localAdapter;
var tim; // Timer
var page = 1;
const lastPage = 5;
var isPaused = false;

/**
 * Set the Bot's `Playing` message.
 *
 * @param {string} text Value to set as the `Activity`
 * @param {Object} options Values to Pass to the Client
 *    type: [PLAYING, STREAMING, LISTENING, WATCHING]
 */
const set = (text, type) => {
	if(isPaused == false) {
		localAdapter.setBotStatus(text, type);
	}
};

const update = () => {
	if(isPaused) return; // Skip since its paused.

	if(page === 1) {
		set(localAdapter.getTotalServers() + ' Users', 'LISTENING');
	}
	else if(page === 2){
		set('with ' + localAdapter.getTotalServers() + ' servers', 'PLAYING');
	}
	else if(page === 3){
		set('Johnny 5 is alive!', 'WATCHING');
	}
	else if(page === 4){
		set('No, I am not on Discord', 'WATCHING');
	}
	else if(page === 5){
		set('Testing123', 'LISTENING');
	}

	page++; // Get Ready for the next Page.
	if(page > lastPage) {
		page = 1; // At the End of the List, Reset
	}
};


module.exports = function(client, adapter) {
	localAdapter = adapter;
	isPaused = false;
	tim = setInterval(update, interval*1000);

	adapter.onAuthenticatedRoute('GET', '/messageRotate/stop', (req, res) => {
		isPaused = true;
		console.log("Status Update Paused")
		res.send({success: true});
	});

	adapter.onAuthenticatedRoute('GET', '/messageRotate/start', (req, res) => {
		isPaused = false;
		console.log("Status Update Resumed")
		res.send({success: true});
	});

	update();
};