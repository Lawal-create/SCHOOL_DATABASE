const express=require("express")
const route=express.Router()

const authControllers=require("../controllers/authController")
const teacherController=require("../controllers/teacherController")

route
.post(
    "/signup",
    authControllers.teacherSignup)
.post(
    "/login",
    authControllers.teacherLogin)


route
.post(
    "/forgotPassword",
    authControllers.forgotTeacherPassword)

.patch(
    "/resetPassword/:token",
    authControllers.resetTeacherPassword)

route
.patch(
    "/updatePassword",
    authControllers.protectStudent,
    authControllers.restrictStudentTo('admin'),
    authControllers.updateTeacherPassword)

// route
// .patch("/updateAdmin",authControllers.protectStudent,authControllers.restrictStudentTo('admin'),authControllers.updateAdmin)
route
.get(
    "/",
    authControllers.protectStudent,
    authControllers.restrictStudentTo('admin'),
    teacherController.getAllTeacher)

route
.get("/:id",authControllers.protectStudent,authControllers.restrictStudentTo('admin') ,teacherController.findTeacher)
.patch("/:id",authControllers.protectStudent,authControllers.restrictStudentTo('admin'),teacherController.updateTeacher)
.delete("/:id",authControllers.protectStudent,authControllers.restrictStudentTo("admin"),teacherController.deleteTeacher)

module.exports=route