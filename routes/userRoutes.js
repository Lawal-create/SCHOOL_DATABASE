const express=require("express")
const route=express.Router()

const userControllers=require("../controllers/userController")
const authControllers=require("../controllers/authController") 

//student signup and login route
route
.post("/signup",authControllers.studentSignup)
.post("/login",authControllers.studentLogin)

route
.get("/",authControllers.protectStudent,authControllers.restrictStudentTo("admin"),userControllers.getAllStudent)
.get("/:id",authControllers.protectStudent,authControllers.restrictStudentTo("admin"),userControllers.findStudent)
.patch("/:id",authControllers.protectStudent,authControllers.restrictStudentTo("admin"),userControllers.updateStudent)
.delete("/:id",authControllers.protectStudent,authControllers.restrictStudentTo("admin"),userControllers.deleteStudent)

module.exports=route