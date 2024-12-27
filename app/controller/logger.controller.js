const loggerHelper = require('../helper/logger.helper');
const { Client } = require('@elastic/elasticsearch');


let logger = null;

const getLogger = () => {
    if(logger == null) {
        const esClient = new Client({ node: process.env.ES_HOST});
        logger = loggerHelper.getLogger(esClient, process.env.ES_INDEX);
    }
    return logger;
}

module.exports = {
    getLogger: getLogger
}
