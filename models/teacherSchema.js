const mongoose=require("mongoose")
const teacherSchema=mongoose.Schema({

    admin:Boolean,

    teacherNum:{
        type:Number,
        required:true
    },

    teacherFname:{
        type:String,
        required:true
    },

    teacherMname:{
        type:String,
        required:true
    },
    teacherLname:{
        type:String,
        required:true
    },

    teacherAddressReg:{
        type:String,
        required:true
    },

    teacherPhone:{
        type:String,
        required:true
    },

    teacherGender:{
        type:String,
        required:true
    },

    teacherAge:{
        type:String,
        required:true
    },

    teacherEmailAddress:{
        type:String,
        required:true
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