const mongoose= require('mongoose');

const HouseRentSchema= new mongoose.Schema(
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
area:
{
    type:Number,
    required:true
},
rent:
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

const HouseRentDetails=mongoose.model("HouseRentDetails",HouseRentSchema)
module.exports=HouseRentDetails