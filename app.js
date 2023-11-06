import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()
import cookieParser from 'cookie-parser'
import cors from 'cors'
import productRouter from './src/routes/products.routes.js'
import authRouter from './src/routes/auth.routes.js'


// MiddleWares
app.set('PORT', process.env.PORT || 4000)
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', productRouter)
app.use('/api', authRouter)

export default app