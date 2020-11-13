
function jwtHandler(req, res,  next, passport){
    passport.authenticate("jwt", function(err, user){
        //check if how to pass request with user to the route
        //next(user) does not work next is used to pass to the next middleware
        //work :)
        //continue to app to save token and send it every time
        if(err){
            next(err);
        }else if(user){
            req.user = user;
            console.log("User Found");
            next();
        }else{
            req.user = null;
            next();
        }
    } ,{session: false})(req, res, next);
}


module.exports.jwtHandler = jwtHandler;