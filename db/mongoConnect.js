const mongoose = require('mongoose');

module.exports = () => {

    const connect = () => {
        mongoose.connect(uri, {dbName: 'test'}, function (err) {
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