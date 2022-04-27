const mongoose= require('mongoose');

const FeedbackSchema= new mongoose.Schema(
{
feedbackdata:
{
    type:String,
    required:false
},
rating:
{
    type:Number,
    required:true
}
})

const FeedbackDetails=mongoose.model("FeedbackDetails",FeedbackSchema)
module.exports=FeedbackDetails