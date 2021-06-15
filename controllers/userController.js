const express=require("express")
express()
const Student=require("../models/studentSchema")
const catchAsync=require("../utils/catchAsync")

exports.getAllStudent= catchAsync(async(req,res,next)=>{

        const students=await Student.find().populate("courses")
        res.status(200).json({
            numberOfStudents:students.length,
            data:{
                students
            }
        })
})

exports.findStudent=catchAsync( async(req,res,next)=>{
    const student=await Student.findById(req.params.id)
    res.status(200).json({
        status:"SUCCESS",
        student
    })

})

exports.updateStudent=catchAsync(async(req,res,next)=>{
    const student=await Student.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })

    res.status(200).json({
        status:"SUCCESS",
        student
    })
})

exports.deleteStudent= catchAsync(async(req,res,next)=>{
    await Student.findByIdAndDelete(req.params.id,req.body)

    res.status(204).json({
        status:"SUCCESS",
        data:null
    })
   
})