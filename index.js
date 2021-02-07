const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const passport = require("passport");
const dbDebugger = require("debug")("index-db");
const authRoute = require("./routes/authRoute");
const menuRoute = require("./routes/menuRoute");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const init  = require("./passport/init");
const jwtHandler = require("./passport/jwtAuthService").jwtHandler;
app.use(passport.initialize());

init(passport);
app.use(bodyParser.json());

//middleware
app.use((req, res, next) => {
    next();
})

mongoose.connect(databaseUsers , {useNewUrlParser: true, useUnifiedTopology: true});
dbDebugger("Connected to the database...");
app.get('/',(req, res) => {
    // console.log("Cool");
    res.send("Hello World");
})
if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    console.log("Morgan enabled");
}
app.get("/home", (req,res) => {
    res.send("Home");
})
app.use("/auth/",authRoute(passport));

app.use("/menu/", function(req, res, next){
    
    jwtHandler(req, res, next, passport);
}, menuRoute());

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})


