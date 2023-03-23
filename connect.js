const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const connectDatabase = (url) =>{
    return mongoose.connect(url);
}

module.exports = connectDatabase;