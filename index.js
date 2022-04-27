const express= require('express')
const multer  = require('multer') 
require('dotenv').config();
const cors=require('cors')// npm i cors
const bodyParser=require("body-parser");
const app= express();
const mongoose =require('mongoose')//npm i mongoose
var MongoClient = require('mongodb').MongoClient;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({extended:true}));
app.use(require('./router/Hostel'));
app.use(require('./router/Farmhouse'));
app.use(require('./router/Flat'));
app.use(require('./router/Plot'));
app.use(require('./router/Farm'));
app.use(require('./router/Warehouse'));
app.use(require('./router/House'));
app.use(require('./router/User'));


mongoose.connect("mongodb://localhost:27017/nobroker",{useNewUrlParser:true})
app.use(function(req, res, next) 
{
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});



app.listen(3009,()=>{console.log('server started')})