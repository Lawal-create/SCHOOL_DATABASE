const express=require("express")
const app=express()
const dotenv=require("dotenv")
dotenv.config({path: __dirname + '/.env'})
const PORT=process.env.PORT
const userRoute=require("./routes/userRoutes")

const db=require(`./utils/DatabaseConn.js`)
db()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", userRoute)


app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})

