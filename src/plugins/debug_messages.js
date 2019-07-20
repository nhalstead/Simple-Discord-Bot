'use strict';
const config = require('../config');
const {d, e, c } = require('../server/tools');

module.exports = function(client) {

	client.on('message', inMsg => {
		d(inMsg.content);
	});

};