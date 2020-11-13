const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bCrypt = require('bcrypt');
// const JoiValidation = require("../services/joiService"); 
module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            findOrCreateUser = async function(){
                // find a user in Mongo with provided username
                // const err = JoiValidation.validateSignUp(req.body);
                // if(err){
                    //     return done(err);
                    // }
                    User.findOne({ 'email' :  username }, function(err, user) {
                        // In case of any error, return using the done method
                        if (err){
                            console.log('Error in SignUp: '+err);
                            return done(err);
                        }
                        // already exists
                        if (user) {
                            console.log("Cool");
                            console.log('User already exists with username: '+username);
                            return done(null, false);
                        } else {
                            // if there is no user with that email
                            // create the user
                            // const{username, password, email, firstName, lastName} = req.body; 
                            // const{username,password} = req.body;
                            let newUser = new User();
                            console.log(req.body);
                            // set the user's local credentials
                            newUser.email = username;
                            newUser.password = createHash(password);
                            console.log(password);
                            // console.log(email);
                            // newUser.email = email;
                        // newUser.firstName = firstName;
                        // newUser.lastName = lastName;
                        // save the user
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error in Saving user: '+err);  
                                throw err;  
                            }
                            console.log('User Registration succesful');    
                            console.log(newUser);
                            return done(null, newUser);

                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}