const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");



const signupUser = async (req,res) => {
    const {firstName, lastName, email, password, confirmPassword} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: "User already exists"});

        if(password !== confirmPassword) return res.status(400).json({message:"Passwords don't match."});

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`});

        const token = jwt.sign({email: user.email, id: user._id}, 'test', {expiresIn:'1h'});

        res.status(200).json({user, token})
        
    } catch (error) {
        res.status(500).json({message:"Something went wrong."})
    }
}


const signinUser = async (req,res) => {
    const {email,password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({message:"Not a valid user."});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials."});

        const token = jwt.sign(
            {email: existingUser.email, id: existingUser._id},
            'test',
            {expiresIn:'1h'});
        
        res.status(200).json({user:existingUser, token})

    } catch (error) {
        res.status(500).json({message:"Something went wrong."})
    }
}


module.exports = {signupUser, signinUser}