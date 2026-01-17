import { Router } from "express";
import {isAuth} from '../middlewares/auth.middeware'
import {addMessage} from '../controllers/message.controller'
const messageRouter = Router()

messageRouter.post('/add-message/:id', isAuth, addMessage)

export default messageRouter