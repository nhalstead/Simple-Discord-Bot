const winston = require("winston");

const console = new winston.transports.Console({
	level: 'debug',
	colorize: true,
	timestamp: true,
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.simple()
	)
});

const logger = winston.createLogger({
	transports: [console]
});

module.exports = logger;