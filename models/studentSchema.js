const mongoose=require("mongoose")
const studentSchema=mongoose.Schema({

    studNum:{
        type:Number,
        required:true
    },

    studFname:{
        type:String,
        required:true
    },

    studMname:{
        type:String,
        required:true
    },
    studLname:{
        type:String,
        required:true
    },

    studAddressReg:{
        type:String,
        required:true
    },

    studPhone:{
        type:String,
        required:true
    },

    studGender:{
        type:String,
        required:true
    },

    studAge:{
        type:String,
        required:true
    },

    studEmailAddress:{
        type:String,
        required:true
    },

    YearOfEnrollment:{
        type:String
    },

    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"course"
    }]

})

const Student=mongoose.model("Student",studentSchema)

module.exports=Student