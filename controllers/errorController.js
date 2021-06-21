const AppError = require("../utils/appError");

sendErrorDev=(err,res)=>{
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message
    })
}

const handleCastErrorDB= err => {
    const message=`Invalid ${err.path}:${err.value}`
    return new AppError(message,404);
}

const handleDuplicateFieldsDB=err=>{
    const match=err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0]
    const message=`Dupllicate Field Value:${match}. Please use another value`
    return new AppError(message,400)
}

const handleValidationErrorDB=err=>{
    const errors=Object.values(err.errors).map(el=>el.message)
    const message=`Invalid input data:${errors.join(". ")}`
    return new AppError(message,400)
}


module.exports=(err,req,res,next)=>{
    console.log(err.stack)
    err.statusCode=err.statusCode|| 500;
    err.status=err.status|| "error"


    if(err.name==="CastError"){
         err=handleCastErrorDB(err)
    }
    if(err.code===11000){
        err=handleDuplicateFieldsDB(err)
    }

    if(err.name==="ValidationError"){
        err=handleValidationErrorDB(err)
    }


    sendErrorDev(err,res)



}



