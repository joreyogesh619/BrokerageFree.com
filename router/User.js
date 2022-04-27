const express= require('express')
const multer  = require('multer') 
require('dotenv').config();
const cors=require('cors')// npm i cors
const bodyParser=require("body-parser");
const app= express.Router();
const mongoose =require('mongoose')//npm i mongoose
var MongoClient = require('mongodb').MongoClient;
const UserModel=require('../modules/UserDetails');
const FeedbackModel=require('../modules/FeedbackDetails');
var url = "mongodb://localhost:27017/nobroker";
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/nobroker",{useNewUrlParser:true})
app.use(function(req, res, next) 
{
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/nobroker/public/images/Profilepicture')
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

app.post('/insert',upload,async(req,res)=>{
    const Fullname=req.body.Fullname;
    const Emailid=req.body.Emailid;
    const Password=req.body.Password;
    const Address=req.body.Address;
    const Dateofbirth=req.body.Dateofbirth; 
    const Mobilenumber=req.body.Mobilenumber; 
    const Adharnumber=req.body.Adharnumber; 
    const photos=(req.file)?req.file.originalname:null;
    UserModel.findOne({Emailid:Emailid},(err,result)=>{
      if(result)
      {
        res.send({message:"User already registered"});
      }
      else{
        try
            {
              const UserDetails= new UserModel({Fullname:Fullname,Emailid:Emailid,Password:Password,Address:Address,Dateofbirth:Dateofbirth,
                Mobilenumber:Mobilenumber,Adharnumber:Adharnumber,photos:photos});
                 UserDetails.save();
                console.log(photos);
                console.log("Data inserted");
                res.send({message:"Registration Done"});
            }
            catch(err)
            { 
              res.send({message:"Registration Failed"})
              console.log(err);
            }
      }
    });
            
    });

app.post('/logcheck',async(req,res)=>{
    const Emailid=req.body.Emailid;
    const Password=req.body.Password;
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("nobroker");
    var query = {Emailid:`${Emailid}`,Password:`${Password}` };
    dbo.collection("userdetails").find(query).toArray(function(err, result) {
      if (err){
        res.send({message:"Login Failed"});
      }
      else
      {
          if(result[0]==null)
          {
            res.send({message:"Login Failed"});
            console.log("Login Failed");
          }
          else
          {
            res.send({message:"Login successful",result:result});
            console.log("Login Successfull");
          }
        
      }
      
      db.close();
    });
  });
});

app.post('/searchuserproperty',async(req,res)=>{
  const name=req.body.name;
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("nobroker");
  var query = {name:`${name}` };
  dbo.collection("housedetails").find(query).toArray(function(err, result) {
    if (err) throw err;
    else
    {
        if(result[0]==null)
        {
          res.send({message:"Data not found"});
          console.log("Data not found");
        }
        else
        {
          res.send({result:result});
        }
      
    }
    
    db.close();
  });
});
});

app.post('/editpassword',async(req,res)=>{
  const newpassword=req.body.p;
  const emailid=req.body.emailid;
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("nobroker");
  dbo.collection("userdetails").updateOne({"Emailid":`${emailid}`},{$set:{
  "Password":`${newpassword}`}},(err, result)=> {
    if (err) throw err;
    else
    {
          res.send({result:result,message:"Password updated"});
          console.log("Data upadated");
    }
    
    db.close();
  });
});
});

app.post('/editmobileno',async(req,res)=>{
  const newmobileno=req.body.mobileno;
  const emailid=req.body.emailid;
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("nobroker");
  dbo.collection("userdetails").updateOne({"Emailid":`${emailid}`},{$set:{
  "Mobilenumber":`${newmobileno}`}},(err, result)=> {
    if (err) throw err;
    else
    {
          res.send({result:result,message:"Mobile number updated"});
          console.log("Data upadated");

    }
    
    db.close();
  });
});
});

app.post('/editphoto',async(req,res)=>{
  const newphoto=req.body.photo;
  const emailid=req.body.emailid;
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("nobroker");
  dbo.collection("userdetails").updateOne({"Emailid":`${emailid}`},{$set:{
  "photos":`${newphoto}`}},(err, result)=> {
    if (err) throw err;
    else
    {
          res.send({result:result,message:"Profile photo updated"});
          console.log("Data upadated");
    }
    
    db.close();
  });
});
});
app.get('/userdetailsdata',async(req,res)=>{
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("nobroker");
  var query={"Employeeid":{$eq:null}};
  dbo.collection("userdetails").find(query).toArray(function(err, result) {
    if (err) throw err;
    else
    {
        if(result[0]==null)
        {
          res.send({message:"Data not found"});
          console.log("Data not found");
        }
        else
        {
          res.send({result:result});
          console.log(result);
        }
    }
    db.close();
  });
});
});

app.post('/insertfeedback',async(req,res)=>{
  const userfeedbackdata=req.body.feedbackdata;
  const userrating=req.body.rating;
  console.log(userfeedbackdata+" "+userrating);
      try
          {
            const FeedbackDetails= new FeedbackModel({"feedbackdata":userfeedbackdata,"rating":userrating});
              FeedbackDetails.save();
              console.log("Feedback inserted");
              res.send({message:"Feedback Uploaded"});
          }
          catch(err)
          { 
            res.send({message:"Failed to Upload Feedback"})
            console.log(err);
          }
          
  });

  app.get('/getfeedback',async(req,res)=>{
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("nobroker");
    dbo.collection("feedbackdetails").find().toArray(function(err, result) {
      if (err) throw err;
      else
      {
          if(result[0]==null)
          {
            res.send({message:"Feedback not found"});
            console.log("Data not found");
          }
          else
          {
            res.send({result:result});
          }
      }
      db.close();
    });
  });
  });

module.exports=app;
