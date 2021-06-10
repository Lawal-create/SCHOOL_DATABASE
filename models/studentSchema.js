const mongoose=require("mongoose")
const validator=require("validator")
const studentSchema=mongoose.Schema({

    studNum:{
        type:Number,
        required:[true, "please provide your matric Number"]
    },

    studFname:{
        type:String,
        required:[true, "please provide your first name"]
    },

    studMname:{
        type:String,
        required:[true, "please provide your middle name"]
    },
    studLname:{
        type:String,
        required:[true, "please provide your last name"]
    },

    studAddressReg:{
        type:String,
        required:[true, "please provide your registered address"]
    },

    studPhone:{
        type:String,
        required:[true, "please provide your phone number"]
    },

    studGender:{
        type:String,
        required:[true, "please provide your gender"],
        enum:["male","female"]
    },

    studAge:{
        type:String,
        required:[true, "please provide your age"]
    },

    studEmailAddress:{
        type:String,
        required:[true, "please provide your email"],
        unique:true,
        lowecase:true,
        validate:[validator.isEmail, "Please provide a valid email"]


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