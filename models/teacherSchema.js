const mongoose=require("mongoose")
const validator=require("validator")
const teacherSchema=mongoose.Schema({

    admin:Boolean,

    teacherFname:{
        type:String,
        required:[true, "please provide your first name"]
    
    },

    teacherMname:{
        type:String,
        required:[true, "please provide your middle name"]
    },
    teacherLname:{
        type:String,
        required:[true, "please provide your last name"]
    },

    teacherAddressReg:{
        type:String,
        required:[true, "please provide your registered address"]
    },

    teacherPhone:{
        type:String,
        required:[true, "please provide your phone number"]
    },

    teacherGender:{
        type:String,
        required:[true, "please provide your gender"],
        enum:["male","female"]
    },

    teacherAge:{
        type:String,
        required:[true, "please provide your age"]
    },

    teacherEmailAddress:{
        type:String,
        required:[true, "please provide your email"],
        unique:true,
        lowecase:true,
        validate:[validator.isEmail, "Please provide a valid email"]
    },

    teacherDuration:{
        type:String
    },

    courses:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "course"
    }

})

const Teacher=mongoose.model("Teacher",teacherSchema)
module.exports=Teacher