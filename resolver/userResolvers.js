const User = require("../models/Users")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userResolvers = {
    Query: {
        logIn: async (_, {login, password}) => {
            try{
                const loginInfo = await User.findOne({
                    $or: [{username: login}, {email: login}]
                })
                if (!loginInfo || !await bcrypt.compare(password, loginInfo.password)) {
                    throw new Error("Cannot login");
                }
                return "User logged in"
    
            }catch(err){
                throw new Error(err)
            }
        }
    },

    Mutation: {
        signUp: async (_, {username, email, password}) => {
            try{
    
                // check if user exists
                const existUser = await User.findOne({
                    $or: [{email}, {username}]
                })
                if(existUser){
                    return "User already exists"
                }
    
                // creating new user
                const user = new User({
                    username,
                    email,
                    password
                })
                await user.save();
    
                return "user created"
            }catch(err){
                return err
            }
        }
    }
}

module.exports = userResolvers