const StorageDriver = require("./storage");
const fs = require("fs");
const path = require('path');

class FileDriver extends StorageDriver {

	/**
	 * File Storage
	 * File are stoed in a directory and are stored by IDs,
	 *  Each file has the data in it for any stored data.
	 *
	 * @param {string} path Location to store the files.
	 */
	constructor(path) {
		super();
		this.path = path;
		if (!fs.existsSync(this.path)) {
			console.log("Path does not exist!", this.path);
		}
	}

	/**
	 * Used to Get a Value by Key
	 *
	 * @param {string} key ID of the Data Entry
	 * @return {string|number|Object|Boolean} Stored Value, Undefined is a value that can be returned.
	 */
	get(key) {
		try {
			let fLocation = path.resolve(this.path, key);
			return fs.readFileSync(fLocation);
		} catch (e) {
		}
	}

	/**
	 * Used to Put a Value by Key
	 *
	 * @param {string} key ID of the Data Entry
	 * @param {string|number|Object|Boolean} value ID of the Data Entry
	 */
	put(key, value) {
		let fLocation = path.resolve(this.path, key);
		fs.writeFile(fLocation, value, (err) => {
			if (err) {
				console.error(err);
			}
		});
	}

	/**
	 * Used to Delete a Value by Key
	 *
	 * @param {string} key ID of the Data Entry
	 */
	delete(key) {
		let fLocation = path.resolve(this.path, key);
		fs.unlinkSync(fLocation);
	}

}

module.exports = FileDriver;