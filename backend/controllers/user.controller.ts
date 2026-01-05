import {Request, Response, NextFunction} from 'express'
import asyncHandler from 'express-async-handler'
import prisma from '../lib/prima'
import cloudinary from '../lib/cloudinary'


export const updateUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {userId} = req
    const avatar = req.file

    let result
    if(avatar){
      result = await cloudinary.uploader.upload(avatar.path, {resource_type: "image"})
    }

    const data ={...req.body}
    if(avatar){
        data.avatar = result?.secure_url
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data
    })

    const {password, ...userInfo} = updatedUser

    res.status(200).json({
        success: true,
        message: "User updated successfully",
        userInfo

    })
    
})