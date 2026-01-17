import asyncHandler from 'express-async-handler'
import prisma from '../lib/prima'
import { Request, Response, NextFunction } from 'express'
import cloudinary from '../lib/cloudinary'
import jwt from 'jsonwebtoken'

export const getPosts = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {type, city, minPrice, maxPrice, property, bedroom} = req.query
    
    const posts = await prisma.post.findMany({
        where: {
            type: type || undefined,
            city: {
                contains: city || ""
            },
            property: property || undefined,
            price: {
                gte: Number(minPrice) || 0,
                lte: Number(maxPrice) || 1000000
            },
            bedroom: {
                gte: Number(bedroom) || 1
            }
        }
    })
    
        res.status(200).json({
        success: true,
        posts
    })
})

export const getPost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params

    const post = await prisma.post.findUnique({
        where: {
            id
        },
        include: {
            user: {
                omit: {
                    password: true
                }
            }
        },
    })

    if(!post){
        throw new Error("Post not found")
    }

    const {token} = req.cookies
    let saved = false

    if(token){
        const {userId} = jwt.verify(token, String(process.env.JWT_SECRET_KEY))
        const existingSavedPost = await prisma.savedPost.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId: post.id
                }
            }
        })
        if(existingSavedPost){
            saved = true
        }
    }
    res.status(200).json({
        success: true,
        post,
        saved
    })
})

export const addPost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {userId} = req
    const {title, price, city, adress, bedroom, bathroom, longitude, latitude, type, property, size} = req.body

    if(!title || !price || !city || !adress || !bedroom || !bathroom || !longitude || !latitude || !type || !property){
        throw new Error("All fields are required!")
    }

    const pathsArray = Object.values(req.files).map(file => file[0].path)

    if(pathsArray.length === 0){
        throw new Error("You must provide at least one image")
    }

    const result = await Promise.all(pathsArray.map(path => {
        return cloudinary.uploader.upload(path, {resource_type: "image"})
    }))
    
    const urls = result.map(res => res.secure_url)

    const post = await prisma.post.create({
        data: {
            ...req.body,
            price: Number(price),
            bedroom: Number(bedroom),
            bathroom: Number(bathroom),
            longitude: Number(longitude),
            latitude: Number(latitude),
            size: Number(size),
            userId,
            images: urls,
        }
    })


    res.status(200).json({
        success: true,
        message: "Post created successfully",
        post
    })
})

export const deletePost = asyncHandler(async (req:Request, res: Response, next: NextFunction) => {
    const {id} = req.params
    const {userId} = req

    const post = await prisma.post.findUnique({
        where: {
            id
        }
    })

    if(!post){
        throw new Error("Post not found")
    }

    if(post.userId !== userId){
        throw new Error("You are not allowed to delete this post")
    }

    await prisma.post.delete({
        where: {
            id
        }
    })

    res.status(200).json({
        success: true,
        message: "Post deleted successfully!"
    })
})