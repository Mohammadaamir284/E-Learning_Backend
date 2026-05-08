import mongosse from 'mongoose'
import { configDotenv } from 'dotenv'

configDotenv()

const myDB = process.env.MongoDB

const DB = mongosse.connect(myDB).then(()=>{
    console.log("DataBase connect Succesfully");
}).catch((err)=>{
    console.log(err)
    console.log(err.name)
    console.log(err.type)
    console.log(err.message)
    console.log(err.stack)
})

export default DB