const mongoose= require('mongoose');

const RfarmhouseSchema= new mongoose.Schema(
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

area:
{
    type:Number,
    required:true
},
Rent:
{
    type:Number,
    required:true
},
photos:
{
    type:String,
    required:false
}

})

const RfarmhouseDetails=mongoose.model("RfarmhouseDetails",RfarmhouseSchema)
module.exports=RfarmhouseDetails