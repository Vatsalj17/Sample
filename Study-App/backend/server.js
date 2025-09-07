import mongoose from "mongoose";
import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import verificationRoutes from "./routes/verification.js";
import schoolAuthRoutes from './routes/SchoolAuth.js'
import addition from './routes/addition.js'
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/verification' , verificationRoutes )
app.use('/api/school-auth' , schoolAuthRoutes)
app.use('/api/addition' , addition)

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database conncted'))
.catch((err) => console.error(err))

app.listen(process.env.PORT , () => {
    console.log('server is running')
})