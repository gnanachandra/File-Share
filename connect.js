const mongoose = require("mongoose");

const connectDatabase = (url) =>{
    return mongoose.connect(url);
}

module.exports = connectDatabase;