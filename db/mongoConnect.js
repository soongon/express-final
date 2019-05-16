const mongoose = require('mongoose');
const uri = "mongodb+srv://admin:1234@cluster0-vu1ky.mongodb.net/test?retryWrites=true";

module.exports = () => {

    const connect = () => {
        mongoose.connect(
                uri, {dbName: 'test', useNewUrlParser: true}, function (err) {
            if (err) {
                console.log('connection error to mongodb');
            } else {
                console.log('connection ok to mongodb');
            }
        });
    };
    connect();

    mongoose.connection.on('error', (err) => {
        console.log('connection error..');
    });
    mongoose.connection.on('disconnected', () => {
        console.log('disconnected.. try to reconnect');
        connect();
    });
    require('../schemas/article');
};