const router = require("express").Router();
module.exports = function(){
    router.use((req, res, next) => {
        if(req.user){
            //attatch use prefrences
            console.log("user")
        }else{
            //send regular menu
            console.log("no user")
        }
        next()
    })


    //send regular menu
    router.get("/", (req, res) => {
        console.log("lol")
        res.send(req.user);
    });




    return router;
}

