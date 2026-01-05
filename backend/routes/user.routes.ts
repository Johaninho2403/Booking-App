import {Router} from 'express'
import { updateUser } from '../controllers/user.controller'
import { isAuth } from '../middlewares/auth.middeware'
import upload from '../lib/multer'

const userRouter = Router()

userRouter.patch('/update',  isAuth, upload.single("avatar"), updateUser)

export default userRouter