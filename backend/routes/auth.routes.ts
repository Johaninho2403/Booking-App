import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller";
import { isAuth } from "../middlewares/auth.middeware";

const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/is-auth', isAuth)
export default authRouter