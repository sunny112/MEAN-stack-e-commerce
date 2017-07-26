var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://root:1234@ds141118.mlab.com:41118/shopping';
var _connection = null;

//set connecton
var open = function () {
        MongoClient.connect(dburl, function (err, db) {
            if(err){
                console.log("DB connection failed");
                return;
            }
            _connection = db;
            console.log("DB connection open", db);
        });
};
//get a connection when its been created
var get = function () {
    return _connection;
};

module.exports = {
    open: open,
    get: get
};