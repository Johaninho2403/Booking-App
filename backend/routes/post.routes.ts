import {Router} from 'express'
import { addPost, deletePost, getPost, getPosts } from '../controllers/post.controller'
import { isAuth } from '../middlewares/auth.middeware'
import upload from '../lib/multer'

const postRouter = Router()

postRouter.post('/add-post',isAuth, upload.fields([
    {
        name: 'picture1',
        maxCount: 1
    },
    {
        name: 'picture2',
        maxCount: 1
    },
    {
        name: 'picture3',
        maxCount: 1
    },
    {
        name: 'picture4',
        maxCount: 1
    }
]), addPost)
postRouter.get('/get-posts', getPosts)
postRouter.get('/single-post/:id', getPost)
postRouter.delete('/delete-post/:id', isAuth, deletePost)

export default postRouter