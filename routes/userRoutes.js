const express=require("express")
const route=express.Router()

const controllers=require("../controllers/userController")

route
.get("/", controllers.getUsers)


module.exports=route