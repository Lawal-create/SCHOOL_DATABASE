const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcryptjs")
const teacherSchema=mongoose.Schema({

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
        lowercase:true,
        validate:[validator.isEmail, "Please provide a valid email"]
    },

    teacherDuration:{
        type:Number,
    },
    role:{
        type:String,
        default:"admin"
    },

    password:{
        type:String,
        required:[true, "please provide your password"],
        minlength:8,
        select:false
    },

    confirmPassword:{
        type:String,
        required:[true, "please confirm your password"]
    },


    courses:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "course"
    }

})


teacherSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()

    try{
        this.password=await bcrypt.hash(this.password,11)
        this.confirmPassword=undefined  
        next()
        
    }catch(err){
        res.status(401).json({
            status:"ERROR in hashing password",
            errDef:err
        })
    }
})

teacherSchema.methods.correctPassword= async function(
    candidatePassword,
    userPassword){
        
    return await bcrypt.compare(candidatePassword,userPassword)
}

teacherSchema.methods.changePasswordAfter=function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changesTimestamp=parseInt(this.passwordChangedAt.getTime()/1000,10)
        return JWTTimestamp<changesTimestamp
    }
    return false
}


const Teacher=mongoose.model("Teacher",teacherSchema)
module.exports=Teacher