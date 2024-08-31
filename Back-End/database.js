const mongoose = require("mongoose");

const databaseConnecting = (url) =>{
    mongoose.connect(url).then(()=>{
        console.log('Database Connnected Successfully !');
    })
};

module.exports = databaseConnecting;