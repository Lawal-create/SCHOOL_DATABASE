const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcryptjs")
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
        lowercase:true,
        enum:["male","female"]
    },

    studAge:{
        type:Number,
        required:[true, "please provide your age"]
    },

    studEmailAddress:{
        type:String,
        required:[true, "please provide your email"],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail, "Please provide a valid email"]

    },

    YearOfEnrollment:{
        type:Number
    },

    role:{
        type:String,
        default:"user"
    },

    password:{
        type:String,
        required:[true, "please provide your password"],
        minlength:8,
        select:false
    },

    confirmPassword:{
        type:String,
        required:[true, "please confirm your password"],
        validate:{
        validator: function(el){
            return el===this.password
        },
        message:"Please enter a similar password"

        }

    },

    passwordChangedAt:{
        methods:Date,
        select:false 
    },

    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"course"
    }]

})

studentSchema.pre("save",async function(next){
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

// studentSchema.pre('find',function(next){
//     this.populate('courses')
//     next()
// })

// studentSchema.pre('findOne',function(next){
//     this.populate('courses')
//     next()
// })

studentSchema.methods.correctPassword= async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword)
}

studentSchema.methods.changePasswordAfter=function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changesTimestamp=parseInt(this.passwordChangedAt.getTime()/1000,10)
        return JWTTimestamp<changesTimestamp
    }
    return false
}

const Student=mongoose.model("Student",studentSchema)

module.exports=Student