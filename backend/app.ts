import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRouter from './routes/auth.routes'
import errorMiddleware from './middlewares/error.middleware'
import userRouter from './routes/user.routes'
import postRouter from './routes/post.routes'
import chatRouter from './routes/chat.routes'
import messageRouter from './routes/message.routes'
import { Server } from 'socket.io'
import { createServer } from 'node:http'

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
app.use('/api/chat', chatRouter)
app.use('/api/message', messageRouter)
app.use(errorMiddleware)

const server = createServer(app)
let onlineUsers: { userId: any; socketId: string }[] = [] 

const io = new Server(server, {
    cors: {
        origin: [String(process.env.FRONTEND_URL)]
    }
})

io.on("connection", (socket) => {
    socket.on("newUser", (userId) => {
               onlineUsers.push({userId, socketId: socket.id})
               console.log(onlineUsers);
               
    })

    socket.on("newMessage", (receiverId, message) => {
        const receiver = onlineUsers.find(user => user.userId === receiverId)
        io.to(String(receiver?.socketId)).emit("sendMessage", message)
    })

    socket.on("disconnect", () => {
        
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)
    })
})


export default server