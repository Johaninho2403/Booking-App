import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRouter from './routes/auth.routes'
import errorMiddleware from './middlewares/error.middleware'
import userRouter from './routes/user.routes'
import postRouter from './routes/post.routes'
const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [String(process.env.FRONTEND_URL)],
    credentials: true
}))
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use(errorMiddleware)

export default app