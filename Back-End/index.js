const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const databaseConnecting = require("./database");
const url = "mongodb://localhost:27017/e-commerce";
const router = require("./routes");

databaseConnecting(url)

const app = express();
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));
// app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cookieParser()); 
const PORT = 8000;

app.use('/api', router);

app.listen(PORT, ()=>{
    console.log(`Server started on ${PORT} port`);
});
