const express = require('express');
const kafka = require('kafka-node');
const kafkaHelper = require('../helper/kafka.helper');
const loggerController = require('../controller/logger.controller');
// const logger = require('../routes/logger');

let consumer = null;
logger = loggerController.getLogger();


const startKafkaConsumer = async () => {
    if(consumer == null) {
        const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKER });
        consumer = kafkaHelper.getKafkaConsumer(client, process.env.KAFKA_TOPIC);
    }

    // Handle Incoming Kafka Messages
    await consumer.on('message', (message) => {
        console.log(`Received log: ${message.value}`);
        const logEntry = `${new Date().toISOString()} - ${message.value}\n`;
        logger.info(logEntry);
    });

    consumer.on('error', (err) => {
        console.error('Error in Kafka Consumer:', err);
        logger.error(err);
      });
}

module.exports = {
    startKafkaConsumer: startKafkaConsumer
}