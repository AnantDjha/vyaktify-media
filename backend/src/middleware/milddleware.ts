import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"


export const checkToken = async (request: Request, response: Response, next: NextFunction) => {
    const token = request.headers['authorization']?.split(" ")[1];

    console.log(token);

    try {
        if (!token) {
            response.status(401).json({ type: "error", message: "No token provided!" })
            return;
        }

        const secret = process.env.JWT_SECRET as string;
        const tokenVerified = jwt.verify(token as string, secret || "");

        if (!tokenVerified) {
            response.status(401).json({ type: "error", message: "Invalid token or token expired!" })
            return;
        }

        next()
    } catch (error) {
        response.status(500).json({ type: "error", message: "something went wrong" })
    }

}