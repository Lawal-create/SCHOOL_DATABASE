const express=require("express")
const AppError = require("../utils/appError")
express()

exports.home=(req,res,next)=>{

    return res.status(200).send(
        "******MY SCHOOL DATABASE*******"
    )
}