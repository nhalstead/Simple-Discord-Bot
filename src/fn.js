
module.exports = {};

/**
 * If the value is null, use the other value.
 *
 * @params {any} First Value
 * @params {any} Second Value
 * @returns {any} If the first value is undefined, then the second value is used.
 */
module.exports.valueNull = (value, otherValue = false) => {
	return [undefined, null].includes(value) ? otherValue : value;
}