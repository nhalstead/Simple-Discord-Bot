class StorageDriver {

	constructor() {

	}

	/**
	 * Used to Get a Value by Key
	 *
	 * @param {string} key ID of the Data Entry
	 * @return {string|number|Object|Boolean} Stored Value, Undefined is a value that can be returned.
	 */
	get(key) {
		// Get a Key's Value from Storage
		return undefined;
	}

	/**
	 * Used to Put a Value by Key
	 *
	 * @param {string} key ID of the Data Entry
	 * @param {string|number|Object|Boolean} value ID of the Data Entry
	 */
	put(key, value) {
		// Add or Update a key in storage
	}

	/**
	 * Used to Delete a Value by Key
	 *
	 * @param {string} key ID of the Data Entry
	 */
	delete(key) {
		// Remote the Key from Storage
	}

}
module.exports = StorageDriver;