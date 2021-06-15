const express=require("express")
express()
const teacher=require("../models/teacherSchema")
const catchAsync=require("../utils/catchAsync")
const APIFeatures=require("../utils/apiFeatures")
const AppError = require("../utils/appError")

//FInds a teacher based on ID
exports.findTeacher= catchAsync(async(req,res,next)=>{
    if(!req.params.id){
        next(new AppError("Id provided isn't present "))
    }

    const Teacher=await teacher.findById(req.params.id).populate("courses")
    res.status(200).json({
        status:"SUCCESS",
        Teacher
    })

})

//Gets a teacher based on query
exports.getAllTeacher= catchAsync(async(req,res,next)=>{
    const features = new APIFeatures(teacher.find().populate("courses"), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

    const Teachers= await features.query
    res.status(200).json({
        numberOfTeachers:Teachers.length,
        Teachers
    })

})
//Update a teacher based on ID
exports.updateTeacher= catchAsync(async(req,res,next)=>{
const Teacher=await teacher.findByIdAndUpdate(req.params.id,req.body,{
    new:true
})

res.status(200).json({
    status:"SUCCESS",
    Teacher
})
})
//Delete a teacher based on ID
exports.deleteTeacher= catchAsync(async(req,res,next)=>{
await teacher.findByIdAndDelete(req.params.id,req.body)

res.status(204).json({
    status:"SUCCESS",
    data:null
})
})