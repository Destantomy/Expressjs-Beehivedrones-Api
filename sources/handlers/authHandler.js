const jwt = require('jsonwebtoken');
const Auth = require('../models/authModel');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

// jwt token expired time set to 30mins
const createToken = (id, username) => {
    return jwt.sign({ id, username }, process.env.TOKEN, { expiresIn: 1800 });
};

// signup
const signup = async (req, res) => {
    try {
        const id = `user-${uuidv4()}`;
        const { username, password } = req.body;
        // data validation
        if(!username || !password) {
            return res.status(400).json({
                error: 'please complete all the fields form'
            });
        }
        // password validation
        const passwordIsValid = validator.isStrongPassword(password, {
            minLength: 12,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        });
        if(!passwordIsValid) {
            return res.status(400).json({
                error: 'password must contain 12 characters, including: 1 uppercase, 1 lowercase, 1 number, and 1 symbol'
            });
        }
        // checking user is already exist?
        const exist = await Auth.findOne({ username });
        if(exist) {
            return res.status(400).json({
                error: 'username already taken'
            });
        }
        // password hashing
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        // write new user data into db
        const user = await Auth.create({
            id,
            username,
            password: hash
        });
        return res.status(201).json({
            message: 'signup success',
            user: { id, username }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'internal server error'
        });
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // data validation
        if(!username || !password) {
            return res.status(400).json({
                error: 'please complete all the fields form'
            });
        }
        const user = await Auth.findOne({ username });
        if(!user) {
            return res.status(400).json({
                error: 'incorrect username'
            });
        }
        const match = await bcrypt.compare(password, user.password);
        if(!match) {
            return res.status(400).json({
                error: 'incorrect password'
            });
        }
        // if user data valid then create token
        const token = createToken(user.id, user.username);
        return res.status(200).json({
            username: user.username,
            token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'internal server error'
        });
    }
}

module.exports = { signup, login };