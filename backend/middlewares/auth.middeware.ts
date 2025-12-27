import { Request, Response, NextFunction } from "express";
import asyncHandler from 'express-async-handler'
import validator from 'validator'
import jwt from 'jsonwebtoken'

export const isAuth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {token} = req.cookies

    if(!token){
        throw new Error("No token provided. Please log in!")
    }

    if(!validator.isJWT(token)){
        throw new Error("Invalid token")
    }

    const {userId} = jwt.verify(token, String(process.env.JWT_SECRET_KEY))
    
    next()

})