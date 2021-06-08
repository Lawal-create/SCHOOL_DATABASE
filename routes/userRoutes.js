const express=require("express")
const route=express.Router()

const controllers=require("../controllers/userController")

route
.post("/api/courses", controllers.createCourses)
.get("/api/courses", controllers.findCourses)
.put("/api/courses/:id", controllers.updateCourses)
.delete("/api/courses/:id", controllers.deleteCourses)

route
.post("/api/student", controllers.createStudent)
.get("/api/student", controllers.findStudent)
.put("/api/student/:id", controllers.updateStudent)
.delete("/api/student/:id", controllers.deleteStudent)

route
.post("/api/teacher", controllers.createTeacher)
.get("/api/teacher", controllers.findTeacher)
.put("/api/teacher/:id", controllers.updateTeacher)
.delete("/api/teacher/:id", controllers.deleteTeacher)


module.exports=route