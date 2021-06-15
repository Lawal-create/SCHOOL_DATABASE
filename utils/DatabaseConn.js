const mongoose=require("mongoose")

// const DB = process.env.DATABASE_LOCALHOST

const DB = process.env.DATABASE

const connectMongo= async()=>{
try{
    //connect to the database
    await mongoose.connect(
    DB,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology: true,
        useFindAndModify:false
    }
)
    console.log(`MongoDB has successful connected`)
}
catch(err){
    console.log("Couldn't connect to the database. Exiting now....",err);
    process.exit();
}
}
module.exports=connectMongo