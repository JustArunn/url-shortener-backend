const User = require('../models/user');
const jwt = require('jsonwebtoken');


const signup = async(req, res) =>{
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message:'All fields are required',
            })
        }
        const exUser = await User.findOne({email});
        if(exUser){
            // return res.status(401).json({
            //     message:'User already exists',
            // })
            return res.status(401).render('signup', {uae:1});
        }
        else{
            const newUser = User({name, email, password});
            await newUser.save();
            // return res.status(200).json({
            //     message:'User created successfully',
            // })
            return res.status(200).render('login');
        }
    }catch(err){
        return res.status(500).json({
            message:err.message,
        })
    }
}

const login = async(req, res) =>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message:'Email and Password is required',
            })
        }
        const exUser = await User.findOne({email, password}).populate('urls').exec();
        if(!exUser){
            // return res.status(401).json({
            //     message:'User doesnot exist',
            // })
            return res.status(402).render('signup');
        }
        else{
            //JWT
            const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:2*60*1000});
            // return res.setHeader('Authorization', 'Bearer '+ token).status(200).json({
            //     message:'User loggedIn',
            //     loggedInUser:exUser,
            // })
            return res.setHeader('Authorization', 'Bearer '+ token).status(200).render('home', {user:exUser, urls:exUser.urls});
        }
    }catch(err){
        return res.status(500).json({
            message:err.message,
        })
    }
}

const me = async (req, res)=>{
    try{
        const {email} = req.email;
        const authUser = await User.findOne({email}).populate('urls');
        if(authUser){
            return res.status(200).json({
                user:authUser,
            })
        }
    }catch(err){
        return res.status(500).json({
            message:err.message,
        })
    }
}

module.exports = {
    signup,
    login,
    me,
}