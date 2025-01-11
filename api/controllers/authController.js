import User from "../models/usermodel.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signup=async(req,res,next)=>{
    // console.log(req.body);
    const {username,email,password}=req.body;

    if(!username || !email || !password || username === '' || email === '' || password === ''){
        next(errorHandler(400,'All are required'));
    }

    const hashedPassword= bcryptjs.hashSync(password,10);

    const newUser = new User({
        username,
        email,
        password:hashedPassword,
    })

    try {
        await newUser.save();
        res.json('signup is sucessful')
        
    } catch (error) {
      next(error);
    }
};

export const signin =async(req,res,next)=>{
    const {email,password}=req.body;

    if(!email || !password ||email === '' || password === ''){
        next(errorHandler(400,'All fields are required'));
    }

    try {
        const validUser = await User.findOne({email});
        if(!validUser){
            next(errorHandler(404,'User not found'));
        }
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword){
           return next(errorHandler(400,'Invalid password'))
        }
        const token = jwt.sign({id:validUser._id},"86e7b1c268a68fa890f9614a084e5cbbd1aa780dbe6676221a2d5e4f4beaff15");
        res.status(200).cookie('access_token',token,{
            httpOnly:true,
        })
        .json(validUser);
    } catch (error) {
        next(error)
    }
}