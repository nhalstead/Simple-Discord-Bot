'use strict';

module.exports = (client, adapter) => {
	const {onMessage} = adapter;

	/**
	 * This function is to test the Input of the Adapter Methods for
	 *  `onMessage` events.
	 */
	onMessage(({content, del, reply, url}) => {
		if (content.toLowerCase().startsWith("delete")) {
			del();
			reply("Huh?");
		}
	})

};