const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const  jwtKey = require("../assets/keys.json");
const user = require("../models/user");
module.exports = function(passport){
    passport.use("jwt" ,new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
     
        secretOrKey: jwtKey.key,
    },
    function(jwtPayload, done){
        if(jwtPayload){
            user.findById(jwtPayload._id, (err, user) => {
                if(err){
                    console.log("Error");
                    return done(err, false);
                }else if(user){
                    console.log("Found User");
                    return done(null, user);
                }else{
                    return done("error", false);
                }
            })
        }else{
            return done("No Payload", false);
        }
    }))
}
