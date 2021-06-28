const Student=require("../models/studentSchema")
const jwt=require("jsonwebtoken")
const { promisify }=require("util")
const catchAsync=require("../utils/catchAsync")
const AppError = require("../utils/appError")
const sendEmails = require("../utils/email")
const crypto=require("crypto")
const Teacher = require("../models/teacherSchema")

const tokenGen=(id)=> {
    return jwt.sign({id},process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRES_IN})
}

const resetInfo=(resetURL)=>{
    const text=`Forgot your Password. Please submit a patch request with your new password and password confirm to ${resetURL} .\n If you didn't forget your password, please ignore this email. `
    return text
}
exports.studentSignup=catchAsync( async (req,res,next)=>{
        const student= await Student.create(req.body)
        res.status(200).json({
            status:"SUCCESS",
            message:"Your account has been created successfully"
        })
})

exports.studentLogin=catchAsync(async(req,res,next)=>{
    const{studEmailAddress, password}=req.body
    //check if the email and password exists
    if(!studEmailAddress || !password){
        return next(new AppError("Enter appropriate student Email or password",404))
    }
    //checks if the student user exists and password is 
    const student=await Student.findOne({studEmailAddress}).select("+password")

    if(!student || !await student.correctPassword(password,student.password)){
        return next(new AppError("Incorrect password"))
    }
    //if everything is fine, send token to client
    const token=tokenGen(student._id)
    res.status(200).json({
        status:"SUCCESS",
        token	
    })
    
})

exports.teacherSignup=catchAsync(async(req,res,next)=>{
    const teacher= await Teacher.create(req.body)
    res.status(200).json({
        status:"SUCCESS",
        message:"Your account has been created successfully"
    })
})

exports.teacherLogin=catchAsync(async(req,res,next)=>{
    const{teacherEmailAddress, password}=req.body
    //check if the email and password exists
    if(!teacherEmailAddress || !password){
        return next(new AppError("Enter appropriate teacher Email or password",404))
    }
    //checks if the student user exists and password is 
    const teacher=await Teacher.findOne({teacherEmailAddress}).select("+password")

    if(!teacher || !await teacher.correctPassword(password,teacher.password)){
        return next(new AppError("Incorrect password"))
    }
    //if everything is fine, send token to client
    const token=tokenGen(teacher._id)
    res.status(200).json({
        status:"SUCCESS",
        token	
    })
    
})

exports.protectStudent=catchAsync(async(req,res,next)=>{
    //Getting token and checking if it is there
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(" ")[1]
    }

    if(!token){
        return next(new AppError("No token found",401))
    }
    //verification of Token
    const decoded=await promisify(jwt.verify)(token,process.env.JWT_SECRET)

    //Checking if the user still exists
    const currentTeacher=await Teacher.findById(decoded.id)
    if (!currentTeacher){
        return next(new AppError("Please check if you have permission to perform this action otherwise the user belonging to this token no longer exists",401||403))
    }

    //Checking if the user changed password after the token was used
    if(currentTeacher.changePasswordAfter(decoded.iat)){
        return next(new AppError("Teacher recently changed his password, Please log in again",401))
    }

    req.teacher=currentTeacher
    next()
})

exports.restrictStudentTo=(...roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.teacher.role)){
            return next(new AppError("You do not have permission to perform this action",403))
        }
        next()
    }

}

exports.forgotTeacherPassword=catchAsync(async(req,res,next)=>{
    //Get user based on posted email
    const teacher= await Teacher.findOne({teacherEmailAddress:req.body.teacherEmailAddress})
    if(!teacher){
        return next(new AppError("There is no teacher with email Address",404))
    }
    //Generate the random reset token
    let resetToken=teacher.createPasswordResetToken()
    await teacher.save({validateBeforeSave:false})

    //Send it to user email
    const resetURL=`${req.protocol}://${req.get("host")}/api/teacher/resetPassword/${resetToken}`
    const value=resetInfo(resetURL)
    console.log(value)
   
    try{
    await sendEmails({
        email:teacher.teacherEmailAddress,
        subject:"Your password reset token(valid for 10mins)",
        value
    })
   
    return res.status(200).json({
        status:"SUCCESS",
        message:"Token has been sent to the mail"
    })
}catch(err){
    teacher.passwordResetToken=undefined
    teacher.passwordResetExpires=undefined
    teacher.save({validationBeforeSave:false})
    return next(new AppError("Message hasn't been sent to the mail",500))

}
})

exports.forgotStudentPassword=catchAsync(async(req,res,next)=>{
    //Get user based on posted email
    const student= await Student.findOne({studEmailAddress:req.body.studEmailAddress})
    if(!student){
        return next(new AppError("There is no student with email Address",404))
    }
    //Generate the random reset token
    let resetToken=student.createPasswordResetToken()
    await student.save({validateBeforeSave:false})

    //Send it to user email
    const resetURL=`${req.protocol}://${req.get("host")}/api/student/resetPassword/${resetToken}`
    const value=resetInfo(resetURL)
    
    try{
    await sendEmails({
        email:student.studEmailAddress,
        subject:"Your password reset token(valid for 10mins)",
        text:value
    })
   
    return res.status(200).json({
        status:"SUCCESS",
        message:"Token has been sent to the mail"
    })

}catch(err){
    student.passwordResetToken=undefined
    student.passwordResetExpires=undefined
    student.save({validationBeforeSave:false})
    return next(new AppError("Message hasn't been sent to the mail",500))

}
})

exports.resetTeacherPassword=catchAsync(async(req,res,next)=>{
    //Gets a user based on the token
    const hashedToken=crypto.createHash("sha256").update(req.params.token).digest("hex")
    const teacher=await Teacher.findOne({passwordResetToken:hashedToken, passwordResetExpires:{$gt:Date.now()}})
    
    
    if(!teacher){
        return next(new AppError("Token has expired or is invalid",400))
    }

    teacher.password=req.body.password
    teacher.confirmPassword=req.body.confirmPassword
    teacher.passwordResetExpires=undefined
    teacher.passwordResetToken=undefined
    await teacher.save()


    const token=tokenGen(teacher._id)
    return res.status(200).json({
        status:"Success",
        token
    })
})

exports.resetStudentPassword=catchAsync(async(req,res,next)=>{
    //Gets a user based on the token
    const hashedToken=crypto.createHash("sha256").update(req.params.token).digest("hex")
    const student=await Student.findOne({passwordResetToken:hashedToken, passwordResetExpires:{$gt:Date.now()}})
    
    
    if(!student){
        return next(new AppError("Token has expired or is invalid",400))
    }

    student.password=req.body.password
    student.confirmPassword=req.body.confirmPassword
    student.passwordResetExpires=undefined
    student.passwordResetToken=undefined
    await student.save()


    const token=tokenGen(student._id)
    res.status(200).json({
        status:"Success",
        token
    })
    next()
})

