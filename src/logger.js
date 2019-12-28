const { createLogger, transports } = require('winston');

module.exports = {
  logger: createLogger({
    transports: [new transports.Console()],
  }),
};
