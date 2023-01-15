const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema({
    short_id :{
        type:String,
        required:true
    },
    long_url :{
        type : String,
        required:true
    },
    
},{
    timestamps:true
})

module.exports  = mongoose.model("URL",URLSchema);