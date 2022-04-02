
const { GridFSBucket } = require('mongodb');
const mongoose= require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const UserSchema= new mongoose.Schema(
{
ownername:
{
    type:String,
    required:true
},
address:
{
    type:String,
    required:true
},
noofhalls:
{
    type:Number,
    required:false
},
noofbedroom:
{
    type:Number,
    required:false
},
noofkitchen:
{
    type:Number,
    required:false
},
nooftoilet:
{
    type:Number,
    required:false
},
noofbathroom:
{
    type:Number,
    required:false
},
typeofbathroom:
{
    type:String,
    required:true
},
noofbalconies:
{
    type:Number,
    required:false
},
area:
{
    type:Number,
    required:false
},
price:
{
    type:Number,
    required:false
},
image:
{
    type:blob,
    required:false
},
video:
{
    type:blob,
    required:false
}
})

const HouseDetails=mongoose.model("HouseDetails",UserSchema)
module.exports=HouseDetails