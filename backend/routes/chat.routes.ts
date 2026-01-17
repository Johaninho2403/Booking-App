import { Router } from "express";
import { addChat, getChat, getChats, readChat } from "../controllers/chat.controller";
import { isAuth } from "../middlewares/auth.middeware";

const chatRouter = Router()

chatRouter.get('/',isAuth, getChats)
chatRouter.get('/:id', isAuth, getChat)
chatRouter.post('/add-chat', isAuth, addChat)
chatRouter.patch('/:id', isAuth, readChat)

export default chatRouter