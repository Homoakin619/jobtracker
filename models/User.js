require('dotenv').config()

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: [true,"Fullname is required"],
    },
    email: {
        type: String,
        unique: true,
        match:[/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,"Enter a valid email"],
        required: [true,"Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
})

UserSchema.pre('save',function() {
    const salt = bcrypt.genSaltSync(12)
    const hashedPassword = bcrypt.hashSync(this.password,salt);
    this.password = hashedPassword;
})

UserSchema.methods.generateToken = function () {
    const token = jwt.sign({userId: this._id, username: this.username},process.env.JWT_SECRET,{expiresIn: process.env.JWT_LIFETIME});
    return token;
}

UserSchema.methods.matchPassword = function(password) {
    return bcrypt.compareSync(password,this.password);
}


const User = mongoose.model('User',UserSchema);

module.exports = User;