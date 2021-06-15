const express=require("express")
express()
const teacher=require("../models/teacherSchema")
const catchAsync=require("../utils/catchAsync")

exports.findTeacher= catchAsync(async(req,res,next)=>{

    const Teacher=await teacher.findById(req.params.id).populate("courses")
    res.status(200).json({
        status:"SUCCESS",
        Teacher
    })
    console.log("Find Teacher")

})

exports.getAllTeacher= catchAsync(async(req,res,next)=>{

    const Teachers= await teacher.find()
    res.status(200).json({
        status:"SUCCESS",
        Teachers
    })
    console.log("Get Teacher")

})

exports.updateTeacher= catchAsync(async(req,res,next)=>{
const Teacher=await teacher.findByIdAndUpdate(req.params.id,req.body,{
    new:true
})

res.status(200).json({
    status:"SUCCESS",
    Teacher
})
})

exports.deleteTeacher= catchAsync(async(req,res,next)=>{
await teacher.findByIdAndDelete(req.params.id,req.body)

res.status(204).json({
    status:"SUCCESS",
    data:null
})
})