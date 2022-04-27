const mongoose= require('mongoose');

const WarehouseSchema= new mongoose.Schema(
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
noofgodowns:{

    type:Number,
    required:false
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
    required:false
}

})

const WarehouseDetails=mongoose.model("WarehouseDetails",WarehouseSchema)
module.exports=WarehouseDetails