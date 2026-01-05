import { Request, Response, NextFunction } from "express";

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.message);
    res.json({
        success: false,
        message: err.message
    })
}

export default errorMiddleware