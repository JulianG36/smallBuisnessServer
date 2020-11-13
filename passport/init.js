const login = require("./localLogin");
const signUp = require("./signUp");
const authToken = require("./authToken");
const User = require("../models/user");

module.exports = function(passport){
    passport.serializeUser(function(user,done){
        console.log("Serializing user: ");
        done(null, user._id);
    });
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            console.log('deserializing user: '+ user);
            done(err, user);
        });
    });
    login(passport);
    signUp(passport);   
    authToken(passport);
}