const express=require("express")
const route=express.Router()

const authControllers=require("../controllers/authController")
const courseController=require("../controllers/courseController")

route
.post("/",authControllers.protectStudent,authControllers.restrictStudentTo("admin") ,courseController.createCourses)
.get("/",authControllers.protectStudent,authControllers.restrictStudentTo("admin"),courseController.getAllCourses)

route
.get("/:id",authControllers.protectStudent,authControllers.restrictStudentTo("admin"),courseController.findCourse)
.put("/:id", courseController.updateCourses)
.delete("/:id",authControllers.protectStudent,authControllers.restrictStudentTo("admin"),courseController.deleteCourses)

module.exports=route
