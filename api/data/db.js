var mongoose = require('mongoose');
var dburl = 'mongodb://root:1234@ds141118.mlab.com:41118/shopping';

mongoose.Promise = global.Promise;
mongoose.connect(dburl);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connnected to' + dburl);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnnected to' );
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connnected error' + dburl);
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination(SIGINT)');
        process.exit(0);
    });
});

process.on('SIGTERM', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination(SIGTERM)');
        process.exit(0);
    });
});

process.once('SIGUSR2', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination(SIGUSR2)');
        process.kill(process.pid, 'SIGUSR2');
    });
});

//bring in schemas and models
require('./models/product.model.js');
require('./models/user.model.js');
require('./models/cart.model.js');
// require('./models/order.model.js');
