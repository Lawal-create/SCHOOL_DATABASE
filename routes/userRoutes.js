const express=require("express")
const route=express.Router()

const userControllers=require("../controllers/userController")
const authControllers=require("../controllers/authController") 
// const teacherController=require("../controllers/teacherController")
// const courseController=require("../controllers/courseController")

//student signup and login route
route
.post("/signup",authControllers.studentSignup)
.post("/login",authControllers.studentLogin)

route
.get("/:id", userControllers.findStudent)
.get("/",authControllers.protectStudent,authControllers.restrictStudentTo("admin"),userControllers.getAllStudent)
.patch("/:id", userControllers.updateStudent)
.delete("/:id",authControllers.protectStudent,authControllers.restrictStudentTo("admin"),userControllers.deleteStudent)

//teacher signup and login route
// route
// .post("/api/teacher/signup",authControllers.teacherSignup)
// .post("/api/teacher/login",authControllers.teacherLogin)

// route
// .post("/api/courses", courseController.createCourses)
// .get("/api/courses",authControllers.protectStudent,authControllers.restrictStudentTo("admin"),courseController.getAllCourses)
// .get("/api/course",authControllers.protectStudent,authControllers.restrictStudentTo("admin"),courseController.findCourse)
// .put("/api/courses/:id", courseController.updateCourses)
// .delete("/api/courses/:id",authControllers.protectStudent,authControllers.restrictStudentTo("admin"),courseController.deleteCourses)



// route
// .get("/api/teacher",authControllers.restrictStudentTo('admin') ,teacherController.findTeacher)
// .patch("/api/teacher/:id",authControllers.protectStudent,authControllers.restrictStudentTo('admin'),teacherController.updateTeacher)
// .delete("/api/teacher/:id",authControllers.protectStudent,authControllers.restrictStudentTo("admin"),teacherController.deleteTeacher)

module.exports=route