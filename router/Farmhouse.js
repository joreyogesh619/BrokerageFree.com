const express= require('express')
const app= express.Router();
const multer  = require('multer') 
require('dotenv').config();
const path=require("path");
const bodyParser=require("body-parser");
const FarmhouseModel=require('../modules/FarmhouseDetails');
const RfarmhouseModel=require('../modules/RfarmhouseDetails');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/nobroker";
app.use(bodyParser.urlencoded({extended:true}));
app.use(function(req, res, next) 
{
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/nobroker/public/images/Farmhouse')
    },
    filename: function (req, file, cb) {
      try {
        console.log(file.originalname);
        cb(null,file.originalname);
      } catch (error) {
        console.log('error');
      }
    }
  })
  
  var upload = multer({ storage: storage }).single("photos");

app.post('/insertfarmhouse',upload,async(req,res,next)=>{
    const name=req.body.name;
    const address=req.body.address;
    const noofhalls=req.body.noofhalls; 
    const noofbedrooms=req.body.noofbedrooms; 
    const noofbathroom=req.body.noofbathroom; 
    const noofkitchen=req.body.noofkitchen; 
    const nooftoilet=req.body.nooftoilet; 
    const area=req.body.area; 
    const price=req.body.price; 
    const mobileno=req.body.mobileno; 
    const photos=(req.file)?req.file.originalname:null;
    const FarmhouseDetails= new FarmhouseModel({name:name,address:address,noofhalls:noofhalls,
      noofbedrooms:noofbedrooms,noofbathroom:noofbathroom,noofkitchen:noofkitchen,
      nooftoilet:nooftoilet,area:area,price:price,photos:photos,mobileno:mobileno});
  
    try
    {
        await FarmhouseDetails.save();
        res.send({message:"Details Uploaded Successfully"})
        console.log("Data inserted");
    }
    catch(err)
    { 
      console.log(err);
    }
  });
  
  app.post('/insertrfarmhouse',upload,async(req,res,next)=>{
    const name=req.body.name;
    const address=req.body.address;
    const noofhalls=req.body.noofhalls; 
    const noofbedrooms=req.body.noofbedrooms; 
    const noofbathroom=req.body.noofbathroom; 
    const noofkitchen=req.body.noofkitchen; 
    const nooftoilet=req.body.nooftoilet; 
    const mobileno=req.body.mobileno; 
    const area=req.body.area; 
    const Rent=req.body.Rent; 
    const photos=(req.file)?req.file.originalname:null;
    const RfarmhouseDetails= new RfarmhouseModel({name:name,address:address,noofhalls:noofhalls,
      noofbedrooms:noofbedrooms,noofbathroom:noofbathroom,noofkitchen:noofkitchen,
      nooftoilet:nooftoilet,area:area,Rent:Rent,photos:photos,mobileno:mobileno});
  
    try
    {
        await RfarmhouseDetails.save();
        res.send({message:"Details Uploaded Successfully"})
        console.log("Data inserted");
    }
    catch(err)
    { 
      console.log(err);
    }
  });

  app.post('/searchdataBuyFarmhouse',async(req,res)=>{
    const searchvalue=req.body.searchvalue;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("nobroker");
      var query = {$or:[{"district":`${searchvalue}`},{"address":{$regex:`${searchvalue}`}}]};
      dbo.collection("farmhousedetails").find(query).toArray(function(err, result) {
        if (err) throw err;
        else
        {
            if(result[0]==null)
            {
              console.log("Data not found");
            }
            else
            { 
              res.send(result);
            }
        }
        db.close();
      });
    });
  });
  app.post('/usersearchdataBuyFarmhouse',async(req,res)=>{
    const searchvalue=req.body.searchvalue;
    const uname=req.body.name;
    console.log(uname);
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("nobroker");
      var query = {$and:[{$or:[{"district":`${searchvalue}`},{"address":{$regex:`${searchvalue}`}}]},{"name":uname}]};
      dbo.collection("farmhousedetails").find(query).toArray(function(err, result) {
        if (err) throw err;
        else
        {
            if(result[0]==null)
            {
              console.log("Data not found");
            }
            else
            { 
              res.send(result);
            }
        }
        
        db.close();
      });
    });
  });
  module.exports=app;