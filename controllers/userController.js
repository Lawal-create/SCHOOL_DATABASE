const express=require("express")
express()
const Student=require("../models/studentSchema")
const catchAsync=require("../utils/catchAsync")
const APIFeatures=require("../utils/apiFeatures")

//Get students based on query
exports.getAllStudent= catchAsync(async(req,res,next)=>{
    const features = new APIFeatures(Student.find().populate("courses"), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

    const students=await features.query
    res.status(200).json({
        numberOfStudents:students.length,
        data:{
            students
        }
    })
})
//Find a students based on ID
exports.findStudent=catchAsync( async(req,res,next)=>{
    const student=await Student.findById(req.params.id)
    res.status(200).json({
        status:"SUCCESS",
        student
    })

})
//Update a students info
exports.updateStudent=catchAsync(async(req,res,next)=>{
    const student=await Student.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })

    res.status(200).json({
        status:"SUCCESS",
        student
    })
})

//Delete a students based on ID
exports.deleteStudent= catchAsync(async(req,res,next)=>{
    await Student.findByIdAndDelete(req.params.id,req.body)

    res.status(204).json({
        status:"SUCCESS",
        data:null
    })
})