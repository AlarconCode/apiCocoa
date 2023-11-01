import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()
import cookieParser from 'cookie-parser'
import cors from 'cors'
// import {join} from 'path'
import productRouter from './src/routes/products.routes.js'
import authRouter from './src/routes/auth.routes.js'
// import { CURRENT_DIR } from './src/libs/storage.js'
import fileUpload from 'express-fileupload'

// MiddleWares
app.set('PORT', process.env.PORT || 4000)
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './uploads'
}))
app.use(cors({
  credentials: true
}))
app.use('/api', productRouter)
app.use('/api', authRouter)
// app.use('/public', express.static(join(CURRENT_DIR, '../../uploads')))

export default app