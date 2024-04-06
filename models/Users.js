const mongoose = require("mongoose")

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'That is not a valid email, please try again']
    },
    password:{
        type: String,
        required: true
    }
})

// hash password before saving to db
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
        next()
    }catch(error){
        next(error)
    }
});

const User = mongoose.model('User', userSchema)
module.exports = User