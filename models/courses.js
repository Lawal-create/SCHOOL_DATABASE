const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const courseSchema=new Schema({
    name:{
        type:String,
        required:true
    },

    units:{
        type:String,
        required:true
    },

    taughtBy:{
        type:Schema.Types.ObjectId,
        ref:"Teacher",
    },

    attendedBy:[{
        type:Schema.Types.ObjectId,
        ref:"Student",
    }]
})


const course=mongoose.model("course",courseSchema)

module.exports=course