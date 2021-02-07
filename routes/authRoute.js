const router = require("express").Router();
const jwtKeys = require("../assets/keys.json");
const jwt = require("jsonwebtoken");
module.exports = function(passport){
    router.post('/login', function(req, res, next){

        passport.authenticate("localLogin", {session: false}, function(err, user, info){
			console.log("err");
			if(err){
                return next(err);
            }else if(user){
                req.logIn(user,{session: false}, function(err){
                    if(err){
                        return next(err);
                    }else{
                        const token = jwt.sign(user.toJSON(), jwtKeys.key);
                        return res.status(200).json({user, token});
                    }
                })
            }else{
                res.status(400).send("Login Error");
            }

        })(req, res, next);
    });
	router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
		failureRedirect: '/' 
	}));

    
    return router;
}
