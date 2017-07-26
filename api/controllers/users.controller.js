var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt      = require('jsonwebtoken');

module.exports.register = function (req,res) {
    console.log('register user');

    var username = req.body.username;
    var name = req.body.name || null;
    var email = req.body.email|| null;
    var password = req.body.password;

    User.create({
        username: username,
        name: name,
        email: email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    },
            function (err, user) {
        if(err){
            console.log(err);
            res.status(400).json(err);
    }else{
            console.log("user created", user);
            res.status(201).json(user);
        }
    })
};

module.exports.login = function(req, res){
    console.log('logging in');
    var username = req.body.username;
    var password = req.body.password;

    User. findOne({
        username: username
    }).exec(function (err, user){
        if (err){
            console.log(err);
            res.status(400).json(err);
        }else{
            if(bcrypt.compareSync(password, user.password)){
                console.log('User found', user);
                var token = jwt.sign({ username: user.username }, 's3cr3t', { expiresIn: 3600 });
                res.status(200).json({success: true, token: token});
            }else{
                res.status(401).json('can not login');
            }

        }
    });
};
// module.exports.getUser = function(req, res){
//     User.findOne({
//         username: username
//     }).exec(function(err, user){
//         if(!user){
//             res
//                 .json(404,{msg:'User not found'});
//         }else{
//             res.json(user);
//         }
//     })
// }
//middleware function
module.exports.authenticate = function(req, res, next) {
    var headerExists = req.headers.authorization;
    if (headerExists) {
        var token = req.headers.authorization.split(' ')[1]; //--> Authorization Bearer xxx(the place for token)
        jwt.verify(token, 's3cr3t', function(error, decoded) {
            if (error) {
                console.log(error);
                res.status(401).json('Unauthorized');
            } else {
                req.user = decoded.username;
                next();
            }
        });
    } else {
        res.status(403).json('No token provided');
    }
};
