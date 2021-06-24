const Student=require("../models/studentSchema")
const Teacher=require("../models/teacherSchema")
const jwt=require("jsonwebtoken")
const { promisify }=require("util")
const catchAsync=require("../utils/catchAsync")
const AppError = require("../utils/appError")
const { findById } = require("../models/courses")

const tokenGen=(id)=> {
    return jwt.sign({id},process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRES_IN})
}

exports.studentSignup=catchAsync( async (req,res,next)=>{
        const student= await Student.create(req.body)
        const token= tokenGen(student._id)
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
    const token= tokenGen(teacher._id)
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
    console.log(decoded)

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


