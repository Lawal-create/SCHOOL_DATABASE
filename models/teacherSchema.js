const mongoose=require("mongoose")
const teacherSchema=mongoose.Schema({

    admin:Boolean,

    teachNum:{
        type:Number,
        required:true
    },

    teachFname:{
        type:String,
        required:true
    },

    teachMname:{
        type:String,
        required:true
    },
    teachLname:{
        type:String,
        required:true
    },

    teachAddressCity:{
        type:String,
        required:true
    },

    teachAddressReg:{
        type:String,
        required:true
    },

    teachPhone:{
        type:String,
        required:true
    },

    teachGender:{
        type:String,
        required:true
    },

    teachAge:{
        type:String,
        required:true
    },

    teachEmailAddress:{
        type:String,
        required:true
    },

    teachDuration:{
        type:String
    },

    courses:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "course"
    }

})
module.exports=mongoose.model("Teacher",teacherSchema)