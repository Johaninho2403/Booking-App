import {Router} from 'express'
import { savePost, updateUser, userProfile } from '../controllers/user.controller'
import { isAuth } from '../middlewares/auth.middeware'
import upload from '../lib/multer'

const userRouter = Router()

userRouter.patch('/update',  isAuth, upload.single("avatar"), updateUser)
userRouter.post('/save-post/:id', isAuth, savePost)
userRouter.get('/profile', isAuth, userProfile)
export default userRouter