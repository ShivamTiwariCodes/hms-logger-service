const kafka = require('kafka-node');

const Consumer = kafka.Consumer;

const getKafkaConsumer = (client, kafkaTopic) => {
    console.log("Get kafka consumer for kafka topic : " + kafkaTopic);
    return new Consumer(
        client,
        [{topic: kafkaTopic, partition: 0}],
        {autoCommit: true}
    )
}

module.exports = {
    getKafkaConsumer: getKafkaConsumer
}