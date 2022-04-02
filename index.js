const express= require('express')
const cors=require('cors')// npm i cors
const app= express();
const mongoose =require('mongoose')//npm i mongoose
var MongoClient = require('mongodb').MongoClient;
const UserModel=require('./modules/UserDetails');
const HouseModel=require('./modules/HouseDetails');
const req = require('express/lib/request');
var url = "mongodb://localhost:27017/nobroker";
app.use(express.json())
app.use(cors())
mongoose.connect("mongodb://localhost:27017/nobroker",{useNewUrlParser:true})
app.use(function(req, res, next) 
{
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});
app.post('/insert',async(req,res)=>{
    const Fullname=req.body.Fullname;
    const Emailid=req.body.Emailid;
    const Password=req.body.Password;
    const Address=req.body.Address;
    const Dateofbirth=req.body.Dateofbirth; 
    const Mobilenumber=req.body.Mobilenumber; 
    const Adharnumber=req.body.Adharnumber; 
    const UserDetails= new UserModel({Fullname:Fullname,Emailid:Emailid,Password:Password,Address:Address,Dateofbirth:Dateofbirth,Mobilenumber:Mobilenumber,Adharnumber:Adharnumber})

    try
    {
        await UserDetails.save();
        console.log("Data inserted");
    }
    catch(err)
    { console.log(err);
    }
});

app.post('/inserthousedetails',async(req,res)=>{
  const ownername=req.body.ownername;
  const address=req.body.address;
  const noofhalls=req.body.noofhalls; 
  const noofbedrooms=req.body.noofbedrooms; 
  const noofbathroom=req.body.noofbathroom; 
  const bathroomtype=req.body.bathroomtype; 
  const noofkitchen=req.body.noofkitchen; 
  const nooftoilet=req.body.nooftoilet; 
  const noofbalconies=req.body.noofbalconies; 
  const images=req.body.images;
  const video=req.body.video;
  const HouseModel= new HouseModel({ownername:ownername,address:address,noofhalls:noofhalls,
    noofbedrooms:noofbedrooms,noofbathroom:noofbathroom,bathroomtype:bathroomtype,noofkitchen:noofkitchen,
    nooftoilet:nooftoilet,noofbalconies:noofbalconies,images:images,video:video});

  try
  {
      await HouseModel.save();
      console.log("Data inserted");
  }
  catch(err)
  { console.log(err);
  }
});

app.post('/logcheck',async(req,res)=>{
    const Emailid=req.body.Emailid;
    const Password=req.body.Password;
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("nobroker");
    var query = {Emailid:`${Emailid}`,Password:`${Password}` };
    dbo.collection("userdetails").find(query).toArray(function(err, result) {
      if (err) throw err;
      else
      {
          if(result[0]==null)
          {
            console.log("Login Failed");
          }
          else
          {
            console.log("Login Successfull");
          }
        
      }
      
      db.close();
    });
  });
});
app.listen(3001,()=>{console.log('server started')})