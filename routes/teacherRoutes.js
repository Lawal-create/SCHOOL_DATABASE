const express=require("express")
const route=express.Router()

const authControllers=require("../controllers/authController")
const teacherController=require("../controllers/teacherController")

route
.post("/signup",authControllers.teacherSignup)
.post("/login",authControllers.teacherLogin)

route
.get("/",authControllers.restrictStudentTo('admin') ,teacherController.getAllTeacher)

route
.get("/:id",authControllers.restrictStudentTo('admin') ,teacherController.findTeacher)
.patch("/:id",authControllers.protectStudent,authControllers.restrictStudentTo('admin'),teacherController.updateTeacher)
.delete("/:id",authControllers.protectStudent,authControllers.restrictStudentTo("admin"),teacherController.deleteTeacher)

module.exports=route