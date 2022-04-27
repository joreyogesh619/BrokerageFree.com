const express= require('express');
const path=require("path");
const bodyParser=require("body-parser");
const app= express.Router();
const multer  = require('multer') 
require('dotenv').config();
app.use(bodyParser.urlencoded({extended:true}));
const WarehouseModel=require('../modules/WarehouseDetails');
const WarehouseRentModel=require('../modules/WarehouseRentDetails');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/nobroker";
app.use(function(req, res, next) 
{
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, '../client/nobroker/public/images/StoreAndWarehouse')
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
app.post('/insertwarehousedetails',upload,async(req,res,next)=>{
    const name=req.body.name;
    const address=req.body.address;
    const state=req.body.state;
    const district=req.body.district;
    const noofgodowns=req.body.noofgodowns;
    const area=req.body.area; 
    const price=req.body.price;
    const mobileno=req.body.mobileno; 
    const photos=(req.file)?req.file.originalname:null;
    const WarehouseDetails = new WarehouseModel({name:name,address:address,state:state,district:district,
      noofgodowns:noofgodowns,area:area,price:price,photos:photos,mobileno:mobileno});
  
    try
    {
        await WarehouseDetails.save();
        res.send({message:"Details Uploaded Successfully"})
        console.log("Data inserted");
    }
    catch(err)
    { 
      console.log(err);
    }
  });
  app.post('/insertwarehouserentdetails',upload,async(req,res,next)=>{
    const name=req.body.name;
    const address=req.body.address;
    const state=req.body.state;
    const district=req.body.district;
    const noofgodowns=req.body.noofgodowns;
    const area=req.body.area; 
    const rent=req.body.rent; 
    const mobileno=req.body.mobileno; 
    const photos=(req.file)?req.file.originalname:null;
    const WarehouseRentDetails= new WarehouseRentModel({name:name,address:address,state:state,district:district,
      noofgodowns:noofgodowns,area:area,rent:rent,photos:photos,mobileno:mobileno});
  
    try
    {
        await WarehouseRentDetails.save();
        res.send({message:"Details Uploaded Successfully"})
        console.log("Data inserted");
    }
    catch(err)
    { 
      console.log(err);
    }
  });

  app.post('/searchdataBuyStoreAndWarehouse',async(req,res)=>{
    const searchvalue=req.body.searchvalue;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("nobroker");
      var query = {$or:[{"district":`${searchvalue}`},{"address":{$regex:`${searchvalue}`}}]};
      dbo.collection("warehousedetails").find(query).toArray(function(err, result) {
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

  app.post('/searchdataRentStoreAndWarehouse',async(req,res)=>{
    const searchvalue=req.body.searchvalue;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("nobroker");
      var query = {$or:[{"district":`${searchvalue}`},{"address":{$regex:`${searchvalue}`}}]};
      dbo.collection("warehouserentdetails").find(query).toArray(function(err, result) {
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

  app.post('/usersearchdataBuyStoreAndWarehouse',async(req,res)=>{
    const searchvalue=req.body.searchvalue;
    const uname=req.body.name;
    console.log(uname);
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("nobroker");
      var query = {$and:[{$or:[{"district":`${searchvalue}`},{"address":{$regex:`${searchvalue}`}}]},{"name":uname}]};
      dbo.collection("warehousedetails").find(query).toArray(function(err, result) {
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
  app.post('/usersearchdataRentStoreAndWarehouse',async(req,res)=>{
    const searchvalue=req.body.searchvalue;
    const uname=req.body.name;
    console.log(uname);
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("nobroker");
      var query = {$and:[{$or:[{"district":`${searchvalue}`},{"address":{$regex:`${searchvalue}`}}]},{"name":uname}]};
      dbo.collection("warehouserentdetails").find(query).toArray(function(err, result) {
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