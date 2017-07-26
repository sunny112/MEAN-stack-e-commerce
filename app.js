require('./api/data/db.js');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
// var session = require('express-session');
// var MongoStore = require('connect-mongo');//(session)
// var store = new MongoStore({
//     url: 'mongodb://root:1234@ds141118.mlab.com:41118/shopping'
// });
var routes = require('./api/routes');

// // Define the port to run on
// app.set('port', process.env.PORT || 3000);
// // Listen for requests
// var server = app.listen(app.get('port'), function() {
//     var port = server.address().port;
//     console.log('Magic happen on port ' + port);
// });
var server = app.listen((process.env.PORT || 3000), function(){
    console.log('Magic happen on port ' + 3000);
})


// Add middleware to console log every request
app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/fonts', express.static(__dirname + '/fonts'));
//false don't need other data type expect json and
app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());

// app.use(session({
//     secret:'sunny',
//     resave: false,
//     saveUninitialized: false,
//     store: store,
//     cookie: {maxAge: 180 * 60 * 1000}
// }));
// Add some routing
app.use('/api', routes);

// app.get('/', function(req, res) {
//     res.send('Hello ' + JSON.stringify(req.session));
// });

module.exports = app;