const mongoose= require('mongoose');

const PlotSchema= new mongoose.Schema(
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

const PlotDetails=mongoose.model("PlotDetails",PlotSchema)
module.exports=PlotDetails