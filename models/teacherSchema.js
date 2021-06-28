const mongoose=require("mongoose")
const crypto=require("crypto")
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
    },

    passwordChangedAt:{
        methods:Date,
        select:false 
    },

    passwordResetToken:String,
    passwordResetExpires:Date

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

teacherSchema.pre("save",function(next){
    if(!this.isModified("password")|| this.isNew){
        return next()
    }
    this.passwordChangedAt=Date.now()-1000
    next()
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

teacherSchema.methods.createPasswordResetToken= function(){
    const resetToken= crypto.randomBytes(32).toString("hex");

    this.passwordResetToken=crypto.createHash("sha256").update(resetToken).digest('hex')
    this.passwordResetExpires=Date.now()+10*60*1000

    console.log(`${resetToken},${this.passwordResetToken}`)

    return resetToken
}


const Teacher=mongoose.model("Teacher",teacherSchema)
module.exports=Teacher