const express= require('express')
const app= express.Router();
const multer  = require('multer'); 
const path=require("path");
const bodyParser=require("body-parser");
require('dotenv').config();
const HostelModel=require('../modules/HostelDetails');
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
        cb(null, '../client/nobroker/public/images/Hostel')
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

app.post('/inserthosteldetails',upload,async(req,res)=>{
    const name=req.body.name;
    const address=req.body.address;
    const state=req.body.state;
    const district=req.body.district;
    const hostelname=req.body.hostelname;
    const rent=req.body.rent;
    const noofbeds=req.body.noofbeds;
    const photos=(req.file)?req.file.originalname:null;
    const mobileno=req.body.mobileno;
    const HostelDetails= new HostelModel({name:name,address:address,state:state,district:district,hostelname:hostelname,rent:rent,
      noofbeds:noofbeds,photos:photos,mobileno:mobileno});
    try
    {
        await HostelDetails.save();
        res.send({message:"Details Uploaded Successfully"})
        console.log("Data inserted");
    }
    catch(err)
    { 
      console.log(err);
    }
  });

  app.post('/searchdataRentHostel',async(req,res)=>{
    const searchvalue=req.body.searchvalue;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("nobroker");
      var query = {$or:[{"district":`${searchvalue}`},{"address":{$regex:`${searchvalue}`}}]};
      dbo.collection("hosteldetails").find(query).toArray(function(err, result) {
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

  app.post('/usersearchdataRentHostel',async(req,res)=>{
    const searchvalue=req.body.searchvalue;
    const uname=req.body.name;
    console.log(uname);
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("nobroker");
      var query = {$and:[{$or:[{"district":`${searchvalue}`},{"address":{$regex:`${searchvalue}`}}]},{"name":uname}]};
      dbo.collection("hosteldetails").find(query).toArray(function(err, result) {
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