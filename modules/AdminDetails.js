
const mongoose= require('mongoose');
const AdminSchema= new mongoose.Schema(
{
Fullname:
{
    type:String,
    required:true
},
Emailid:
{
    type:String,
    required:true
},
Password:
{
    type:String,
    required:true
},
Address:
{
    type:String,
    required:true
},
Dateofbirth:
 {
     type:Date,
     required:true
},
Mobilenumber:
{
    type:Number,
    required:true
},
Adharnumber:
{
    type:Number,
    required:true
}
})

const AdminDetails=mongoose.model("AdminDetails",AdminSchema)
module.exports=AdminDetails