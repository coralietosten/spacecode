import {Request, Response , NextFunction} from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";



interface JwtPayload {
    id: number;
    email: string;
}

const verifyJwt = <T = JwtPayload>(token : string): T =>{
    return jwt.verify(token, JWT_SECRET) as T
}

export interface AuthRequest extends Request{
    user? : JwtPayload;
}

export const requireAuth =async (req: AuthRequest, res : Response, next : NextFunction) =>{
    const token = req.cookies.token;

    if (!token){
        return res.status(401).json({erreur : "token invalide"});
    }
    try{
        const payload = verifyJwt(token);
        req.user = payload;
        next();
    }
    catch(err){
        return res.status(403).json({erreur : "mauvais token"});
    }
};
