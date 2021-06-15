const express=require("express")
const app=express()
const morgan=require("morgan")
const dotenv=require("dotenv")
dotenv.config({path: __dirname + '/.env'})
const PORT=process.env.PORT
const userRoute=require("./routes/userRoutes")
const teacherRoute=require("./routes/teacherRoutes")
const courseRoute=require("./routes/courseRoutes")
const AppError=require("./utils/appError")
const globalErrorHandler=require("./controllers/errorController")


const db=require(`./utils/DatabaseConn.js`)
db()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))


app.use("/api/courses", courseRoute)
app.use("/api/student", userRoute)
app.use("/api/teacher",teacherRoute)


app.all("*",(req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server`,500))
})
app.use(globalErrorHandler)



app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})

