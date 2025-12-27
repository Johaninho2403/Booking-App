import asyncHandler from 'express-async-handler'
import { Request, Response, NextFunction } from 'express'
import prisma from '../lib/prima'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {username, email, password} = req.body

    if(!username || !email || !password){
        throw new Error("Username, email and password are all required")
    }

    if(!validator.isEmail(email)){
        throw new Error("Invalid email format")
    }

    if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong password!")
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(existingUser){
        throw new Error("User already exists")
    }

    const salt = 10
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        }
    })

    res.status(201).json({
        success: true,
        message: "User created successfully!"
    })
})

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = await req.body

     if(!email || !password){
        throw new Error("Username, email and password are all required")
    }

    if(!validator.isEmail(email)){
        throw new Error("Invalid email format")
    }

    if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong password!")
    }

    const existingUser = await prisma.user.findUnique({
        where: {email}
    })

    if(!existingUser){
        throw new Error("User not found!")
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

    if(!isPasswordCorrect){
        res.status(400)
        throw new Error("Incorrect email or password")
    }

    const token = jwt.sign({userId: existingUser.id}, String(process.env.JWT_SECRET_KEY), {expiresIn: "7d"})

    const {password: userPassword, ...userInfo} = existingUser
    res.status(200).cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "PRODUCTION",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: process.env.NODE_ENV == "PRODUCTION" ? "none" : "lax"
    }).json({
        success: true,
        message: "Logged in successfully!",
        userInfo
    })
})

export const logout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "PRODUCTION",
        sameSite: process.env.NODE_ENV === "PRODUCTION" ? 'none' : "lax"
    }).json({
        success: true,
        message: "Lodgged out successfully"
    })
})