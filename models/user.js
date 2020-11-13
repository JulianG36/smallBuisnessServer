const mongoose = require("mongoose");
module.exports = mongoose.model("user", {
    email: String,
    password: String,
    firstName: String,
    lastName: String,
});