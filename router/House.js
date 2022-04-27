const express= require('express')
const app= express.Router();
const multer  = require('multer');
require('dotenv').config();

const HouseModel=require('../modules/HouseDetails');
const path=require("path");
const bodyParser=require("body-parser");
const HouseRentModel=require('../modules/HouseRentDetails');
const mongoose =require('mongoose')//npm i mongoose
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
        cb(null, '../client/nobroker/public/images/House')
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
  
  app.post('/inserthousedetails',upload,async(req,res,next)=>{
    const name=req.body.name;
    const address=req.body.address;
    const state=req.body.state;
    const district=req.body.district;
    const noofhalls=req.body.noofhalls; 
    const noofbedrooms=req.body.noofbedrooms; 
    const noofbathroom=req.body.noofbathroom; 
    const bathroomtype=req.body.bathroomtype; 
    const noofkitchen=req.body.noofkitchen; 
    const nooftoilet=req.body.nooftoilet; 
    const noofbalconies=req.body.noofbalconies; 
    const price=req.body.price;
    const area=req.body.area;
    console.log(req.file);
    const photos=(req.file)?req.file.originalname:null;
    const mobileno=req.body.mobileno;
  
    const HouseDetails= new HouseModel({name:name,address:address,state:state,district:district,noofhalls:noofhalls,
      noofbedrooms:noofbedrooms,noofbathroom:noofbathroom,bathroomtype:bathroomtype,noofkitchen:noofkitchen,
      nooftoilet:nooftoilet,noofbalconies:noofbalconies,price:price,area:area,photos:photos,mobileno:mobileno});
  
    try
    {
        await HouseDetails.save();
        res.send({message:"Details Uploaded Successfully"})
        console.log(photos);
        console.log("Data inserted");
    }
    catch(err)
    { 
      console.log(err);
    }
  });

  app.post('/inserthouserentdetails',upload,async(req,res,next)=>{
    const name=req.body.name;
    const address=req.body.address;
    const state=req.body.state;
    const district=req.body.district;
    const noofhalls=req.body.noofhalls; 
    const noofbedrooms=req.body.noofbedrooms; 
    const noofbathroom=req.body.noofbathroom; 
    const bathroomtype=req.body.bathroomtype; 
    const noofkitchen=req.body.noofkitchen; 
    const nooftoilet=req.body.nooftoilet; 
    const noofbalconies=req.body.noofbalconies; 
    const rent=req.body.rent;
    const area=req.body.area;
    const photos=(req.file)?req.file.originalname:null;
    const mobileno=req.body.mobileno;
  
    const HouseRentDetails= new HouseRentModel({name:name,address:address,state:state,district:district,noofhalls:noofhalls,
      noofbedrooms:noofbedrooms,noofbathroom:noofbathroom,bathroomtype:bathroomtype,noofkitchen:noofkitchen,
      nooftoilet:nooftoilet,noofbalconies:noofbalconies,rent:rent,area:area,photos:photos,mobileno:mobileno});
  
    try
    {
        await HouseRentDetails.save();
        res.send({message:"Details Uploaded Successfully"})
        console.log(req.file);
        console.log("Data inserted");
    }
    catch(err)
    { 
      console.log(err);
    }
  });
  app.post('/searchdataBuyHouse',async(req,res)=>{
    const searchvalue=req.body.searchvalue;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("nobroker");
      var query = {$or:[{"district":`${searchvalue}`},{"address":{$regex:`${searchvalue}`}}]};
      dbo.collection("housedetails").find(query).toArray(function(err, result) {
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

  app.post('/searchdataRentHouse',async(req,res)=>{
    const searchvalue=req.body.searchvalue;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("nobroker");
      var query = {$or:[{"district":`${searchvalue}`},{"address":{$regex:`${searchvalue}`}}]};
      dbo.collection("houserentdetails").find(query).toArray(function(err, result) {
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

  app.get('/searchdataHouse',async(req,res)=>{
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("nobroker");
  
      dbo.collection("housedetails").find().toArray(function(err, result) {
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

  app.post('/usersearchdataBuyHouse',async(req,res)=>{
    const searchvalue=req.body.searchvalue;
    const uname=req.body.name;
    console.log(uname);
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("nobroker");
      var query = {$and:[{$or:[{"district":`${searchvalue}`},{"address":{$regex:`${searchvalue}`}}]},{"name":uname}]};
      dbo.collection("housedetails").find(query).toArray(function(err, result) {
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

  app.post('/usersearchdataRentHouse',async(req,res)=>{
    const searchvalue=req.body.searchvalue;
    const uname=req.body.name;
    console.log(uname);
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("nobroker");
      var query = {$and:[{$or:[{"district":`${searchvalue}`},{"address":{$regex:`${searchvalue}`}}]},{"name":uname}]};
      dbo.collection("houserentdetails").find(query).toArray(function(err, result) {
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

  app.post('/deletedataHouse',async(req,res)=>{
    const id="ObjectId("+req.body.id+")";
    console.log(id);
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("nobroker");
      dbo.collection("housedetails").deleteOne({"_id":`${id}`}),(err, result)=> {
        if (err)
        {console.log("err")}
        else
        {
           console.log("Data Deleted");
           res.send({message:"Data Deleted"});
        }
        db.close();
  };
});
});
  module.exports=app;