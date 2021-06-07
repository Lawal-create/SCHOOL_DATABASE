const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const courseSchema=new Schema({
    name:{
        type:String,
        required:true
    },

    units:{
        type:Number,
        required:true
    },

    taughtBy:{
        type:Schema.Types.ObjectId,
        ref:"Teacher",
        required:true
    },

    attendedBy:[{
        type:Schema.Types.ObjectId,
        ref:"Student",
    }]
})

module.exports=mongoose.model("course",courseSchema)