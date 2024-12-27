const { createLogger, format, transports } = require('winston');
const { ElasticsearchTransport } = require('winston-elasticsearch');


const getEsTransportOptions = (esClient, indexPrefix) => {
    return {
        level: 'info', // Minimum log level to send to Elasticsearch
        client: esClient,
        indexPrefix: indexPrefix,
        format: format.combine(
          format.timestamp(),
          format.json()
        ),
    };
}

const getLogger = (esClient, indexPrefix) => {
    return createLogger({
        level: 'info', // Minimum level for console logs
        format: format.combine(
          format.colorize(), // For console logs
          format.timestamp(),
          format.printf(({ level, message, timestamp }) => `${timestamp} [${level}]: ${message}`)
        ),
        transports: [
          new transports.Console(), // Console transport for local debugging
          new ElasticsearchTransport(getEsTransportOptions(esClient, indexPrefix)), // Elasticsearch transport for warn and above
        ],
    });
}

module.exports = {
    getEsTransportOptions: getEsTransportOptions,
    getLogger: getLogger
}

