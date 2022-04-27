const mongoose= require('mongoose');

const HostelSchema= new mongoose.Schema(
{
name:
{
    type:String,
    required:true
},
mobileno:
{
    type:Number,
    required:true
},
address:
{
    type:String,
    required:true
},
state:
{
    type:String,
    required:true
},
district:
{
    type:String,
    required:true
},
hostelname:
{
    type:String,
    required:false //mandatory then true and if not mandatory then use false
},

noofbeds:
{
    type:Number,
    required:false
},

rent:
{
    type:Number,
    required:true
},
photos:
{
    type:String,
    required:true
}

})

const HostelDetails=mongoose.model("HostelDetails",HostelSchema)
module.exports=HostelDetails