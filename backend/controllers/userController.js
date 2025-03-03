import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc        Register a new user
// route        POST /api/user
// @access      Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, authType } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('This email is already registered. Please sign in or use a different email.');
    }
    const user = await User.create({
        name,
        email,
        password,
        authType,
    });
    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error('Something went wrong while creating your account. Please try again later.');
    }
})

// @desc        Auth user/set token
// route        POST /api/user/auth
// @access      Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        if (user.authType === 'password' && await user.matchPassword(password)) {
            generateToken(res, user._id)
            res.status(200).json({
                id: user._id,
                name: user.name,
                email: user.email
            });
        } else if (user.authType === 'oauth') {
            generateToken(res, user._id)
            res.status(200).json({
                id: user._id,
                name: user.name,
                email: user.email
            });
        } else {
            res.status(401);
            throw new Error('Incorrect email or password. Please try again.');
        }
    } else {
        res.status(401);
        throw new Error('No account found with this email. Please sign up to create a new account.');
    }
});

// @desc        Signout user
// route        POST /api/user/signout
// @access      Public
const signoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'User signed out' });
});

export {
    registerUser,
    authUser,
    signoutUser,
};