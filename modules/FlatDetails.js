const mongoose= require('mongoose');

const FlatSchema= new mongoose.Schema(
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

appartmentname:
{
    type:String,
    required:false //mandatory then true and if not mandatory then use false
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
bathroomtype:
{
    type:String,
    required:true
},
noofbalconies:
{
    type:Number,
    required:false
},

parking:
{
    type:String,
    required:true
},

area:
{
    type:Number,
    required:true
},
price:
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

const FlatDetails=mongoose.model("FlatDetails",FlatSchema)
module.exports=FlatDetails