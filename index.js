import express from 'express'
import { configDotenv } from 'dotenv'
import route from './routing/appRouting.js'
import cors from 'cors'
import DB from './DB/db.js'
import cookieParser from 'cookie-parser'


configDotenv()
const app = express()
const Port = process.env.PORT || 7000
const frontend = process.env.FRONTEND

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: frontend,
    credentials: true
}))
app.use(route)

app.listen(Port, () => {
    console.log(`Server Running On Port ${Port}`)
})

