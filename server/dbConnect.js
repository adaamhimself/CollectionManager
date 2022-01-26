const mongoose = require("mongoose");

// Connection string
const mongoString = "mongodb+srv://admin:admincm@cluster0.elcoq.mongodb.net/usersCM";

module.exports.connect = function() {
    return new Promise(function (resolve, reject) {
        mongoose.connect(mongoString, {useNewUrlParser: true, useUnifiedTopology: true});
        mongoose.connection.on("open", () => {
            console.log("Database connection open.");
            resolve();
        });
        mongoose.connection.on("error", (err) => {
            console.error(err);
            reject(err);
        });
    });
}