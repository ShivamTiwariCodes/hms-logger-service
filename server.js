const express = require('express');
require('dotenv').config();

const app = express();
// const PORT = 3005;

var healthRouter = require('./app/routes/index');
var loggerRouter = require('./app/routes/logger');

healthRouter(app);
loggerRouter(app);



const startKafka = () => {
    console.log("Starting kafka consumer .....")
    require('./app/controller/kafka.controller').startKafkaConsumer();
}

startKafka();

// we can also provide using router, create js file -> integrate end points using router -> export router from there
// then use this -> app.use('/users', userRoutes);

app.listen(process.env.PORT, () => {
     console.log({ message: `Logger service is running on http://localhost:${process.env.PORT}` });
  });