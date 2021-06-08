const express=require("express")
express()
const courses=require("../models/courses")
const student=require("../models/studentSchema")
const teacher=require("../models/teacherSchema")

const createStudent= async(req,res,next)=>{
    if(!req.body){
        res.status(400).send({
            message:"Content cannot be empty"
        })
        return;
    }
    try{
        /*
        Create a new Student to the Db
         */
        console.log("Create New Student")
    }catch(error){
        console.log("Input error")
    }
}

const findStudent= async(req,res,next)=>{
    try{
        /*
        Find the student form the Db based on query
         */
        console.log("Find Student")
    }catch(error){
    }
}

const updateStudent= async(req,res,next)=>{
    try{
       /*
       Update the student from the DB based on ID
        */
        console.log("updateStudent")
    }catch(error){
        console.log("Error On Update")
    }
}

const deleteStudent= async(req,res,next)=>{
    try{
        /*
        Delete the student from the DB using the ID       
        */
       console.log("Delete a student")
    }catch(error){
        console.log("Error On Delete")
    }
}

const createTeacher= async(req,res,next)=>{
    if(!req.body){
        res.status(400).send({
            message:"Content cannot be empty"
        })
        return;
    }
    try{
        /*
        Create a new Student to the Db
         */
        console.log("Create New Teacher")
    }catch(error){
        console.log("Input error")
    }
}

const findTeacher= async(req,res,next)=>{
    try{
        /*
        Find the student form the Db based on query
         */
        console.log("Find Student")
    }catch(error){
    }
}

const updateTeacher= async(req,res,next)=>{
    try{
       /*
       Update the student from the DB based on ID
        */
        console.log("updateTeacher")
    }catch(error){
        console.log("Error On Update")
    }
}

const deleteTeacher= async(req,res,next)=>{
    try{
        /*
        Delete the student from the DB using the ID       
        */
       console.log("Delete a Teacher")
    }catch(error){
        console.log("Error On Delete")
    }
}


const createCourses= async(req,res,next)=>{
    if(!req.body){
        res.status(400).send({
            message:"Content cannot be empty"
        })
        return;
    }
    try{
        let course=await courses.create(req.body)
        res.send(course)
    }catch(error){
        console.log("Input error")
    }
}

const findCourses= async(req,res,next)=>{
    try{
        /*
        Find the course form the Db based on query
         */
        console.log("findCourses")
    }catch(error){
    }
}

const updateCourses= async(req,res,next)=>{
    try{
       /*
       Update the course from the DB based on ID
        */
        console.log("updateCourses")
    }catch(error){
        console.log("Error On Update")
    }
}

const deleteCourses= async(req,res,next)=>{
    try{
        /*
        Delete the courses from the DB using the ID       
        */
    }catch(error){
        console.log("Error On Delete")
    }
}






module.exports={
    createCourses,
    findCourses,
    updateCourses,
    deleteCourses,

    createStudent,
    findStudent,
    updateStudent,
    deleteStudent,

    createTeacher,
    findTeacher,
    updateTeacher,
    deleteTeacher
}