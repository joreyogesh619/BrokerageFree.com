const express= require('express')
const path=require("path");
const bodyParser=require("body-parser");
const app= express.Router();
const FlatModel=require('../modules/FlatDetails');
const FlatRModel=require('../modules/FlatRDetails');
const multer  = require('multer') 
require('dotenv').config();
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
        cb(null, '../client/nobroker/public/images/Flat')
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

app.post('/insertflatdetails',upload,async(req,res)=>{
    const name=req.body.name;
    const address=req.body.address;
    const state=req.body.state;
    const district=req.body.district;
    const appartmentname=req.body.appartmentname;
    const noofhalls=req.body.noofhalls; 
    const noofbedrooms=req.body.noofbedrooms; 
    const noofbathroom=req.body.noofbathroom; 
    const bathroomtype=req.body.bathroomtype; 
    const nooftoilet=req.body.nooftoilet; 
    const noofbalconies=req.body.noofbalconies; 
    const parking=req.body.parking;
    const price=req.body.price;
    const area=req.body.area;
    const photos=(req.file)?req.file.originalname:null;
    const mobileno=req.body.mobileno;
    const FlatDetails= new FlatModel({name:name,address:address,state:state,district:district,appartmentname:appartmentname,noofhalls:noofhalls,
      noofbedrooms:noofbedrooms,noofbathroom:noofbathroom,bathroomtype:bathroomtype,mobileno:mobileno,
      nooftoilet:nooftoilet,noofbalconies:noofbalconies,parking:parking,price:price,area:area,photos:photos});
  
    try
    {
        await FlatDetails.save();
        res.send({message:"Details Uploaded Successfully"})
        console.log("Data inserted");
    }
    catch(err)
    { 
      console.log(err);
    }
  });
  
  // flat rent
  app.post('/insertflatrdetails',upload,async(req,res)=>{
    const name=req.body.name;
    const address=req.body.address;
    const state=req.body.state;
    const district=req.body.district;
    const appartmentname=req.body.appartmentname;
    const noofhalls=req.body.noofhalls; 
    const noofbedrooms=req.body.noofbedrooms; 
    const noofbathroom=req.body.noofbathroom; 
    const bathroomtype=req.body.bathroomtype; 
    const nooftoilet=req.body.nooftoilet; 
    const noofbalconies=req.body.noofbalconies; 
    const parking=req.body.parking;
    const rent=req.body.rent;
    const area=req.body.area;
    const photos=(req.file)?req.file.originalname:null;
    const mobileno=req.body.mobileno;
    const FlatRDetails= new FlatRModel({name:name,address:address,state:state,district:district,appartmentname:appartmentname,noofhalls:noofhalls,
      noofbedrooms:noofbedrooms,noofbathroom:noofbathroom,bathroomtype:bathroomtype,mobileno:mobileno,
      nooftoilet:nooftoilet,noofbalconies:noofbalconies,parking:parking,rent:rent,area:area,photos:photos});
  
    try
    {
        await FlatRDetails.save();
        res.send({message:"Details Uploaded Successfully"})
        console.log("Data inserted");
    }
    catch(err)
    { 
      console.log(err);
    }
  });

  app.post('/searchdataBuyFlat',async(req,res)=>{
    const searchvalue=req.body.searchvalue;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("nobroker");
      var query = {$or:[{"district":`${searchvalue}`},{"address":{$regex:`${searchvalue}`}}]};
      dbo.collection("flatdetails").find(query).toArray(function(err, result) {
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

  app.post('/searchdataRentFlat',async(req,res)=>{
    const searchvalue=req.body.searchvalue;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("nobroker");
      var query = {$or:[{"district":`${searchvalue}`},{"address":{$regex:`${searchvalue}`}}]};
      dbo.collection("flatrdetails").find(query).toArray(function(err, result) {
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
  app.post('/usersearchdataBuyFlat',async(req,res)=>{
    const searchvalue=req.body.searchvalue;
    const uname=req.body.name;
    console.log(uname);
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("nobroker");
      var query = {$and:[{$or:[{"district":`${searchvalue}`},{"address":{$regex:`${searchvalue}`}}]},{"name":uname}]};
      dbo.collection("flatdetails").find(query).toArray(function(err, result) {
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
  app.post('/usersearchdataRentFlat',async(req,res)=>{
    const searchvalue=req.body.searchvalue;
    const uname=req.body.name;
    console.log(uname);
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("nobroker");
      var query = {$and:[{$or:[{"district":`${searchvalue}`},{"address":{$regex:`${searchvalue}`}}]},{"name":uname}]};
      dbo.collection("flatrdetails").find(query).toArray(function(err, result) {
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