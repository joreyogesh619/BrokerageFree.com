const mongoose= require('mongoose');

const WarehouseRentSchema= new mongoose.Schema(
{
name:
{
    type:String,
    required:true
},
mobileno:
{
    type:Number,
    required:false
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
    required:false
},
noofgodowns:{

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
    required:false
},
photos:
{
    type:String,
    required:false
}

})

const WarehouseRentDetails=mongoose.model("WarehouseRentDetails",WarehouseRentSchema)
module.exports=WarehouseRentDetails