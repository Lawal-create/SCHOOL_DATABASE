const express=require("express")
express()
const course=require("../models/courses")
const catchAsync=require("../utils/catchAsync")

exports.createCourses= catchAsync(async(req,res,next)=>{
    if(!req.body){
        res.status(400).send({
            message:"Content cannot be empty"
        })
        return;
    }
        let Course=await course.create(req.body)
        res.status(200).json({
            status:"SUCCESS",
            Course
        })
})

exports.getAllCourses=catchAsync( async(req,res,next)=>{
    const Course=await course.find().populate('attendedBy').populate('taughtBy')
    res.status(200).json({
        status:"SUCCESS",
        Course
    })
})

exports.findCourse=catchAsync( async(req,res,next)=>{
    const Course=await course.findById(req.params.id).populate('attendedBy').populate('taughtBy')
    res.status(200).json({
        status:"SUCCESS",
        Course
    })
})

exports.updateCourses=catchAsync(async(req,res,next)=>{
    const Course=await course.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })

    res.status(200).json({
        status:"SUCCESS",
        Course
    })
})

exports.deleteCourses= catchAsync(async(req,res,next)=>{
    await course.findByIdAndDelete(req.params.id,req.body)

    res.status(204).json({
        status:"SUCCESS",
        data:null
    })
})