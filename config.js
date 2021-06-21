require("dotenv").config()

module.exports={
    port:process.env.NODE_ENV==="test"?3001:process.env.PORT,
    dbName:process.env.NODE_ENV==="test" ? process.env.DATABASE_NAME_TEST:process.env.DATABASE_NAME,
    dbURL:process.env.DATABASE_LOCALHOST,
}