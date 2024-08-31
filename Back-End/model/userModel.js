const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    
    Name:{
        type:String
    },
    Email:{
        type:String,
        unique:true,
        required:true
    },
    Password:{
        type:String
    },
    ProfilePic:{
        type:String
    },
    Role:{
        type:String
    }

}, {timestamps:true});


const userModel = mongoose.model("user", userSchema);

module.exports = userModel;