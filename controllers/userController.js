const express=require("express")
express()
const courses=require("../models/courses")
const student=require("../models/studentSchema")
const teacher=require("../models/teacherSchema")


const getUsers= async(req,res,next)=>{
    try{
        const value=req.body
        res.send(value)
    }catch(error){
        console.log("Omo jappa")
    }
}


module.exports={
    getUsers
}