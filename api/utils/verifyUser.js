import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(errorHandler(401,'Unauthorized'));
    }
    jwt.verify(token,"86e7b1c268a68fa890f9614a084e5cbbd1aa780dbe6676221a2d5e4f4beaff15",(err,user)=>{
        if(err){
            return next(errorHandler(401,'Unauthorized'));
        }
        req.user = user;
        next();
    });
}