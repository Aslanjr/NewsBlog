const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const jwt  = require('jsonwebtoken');
const Schema = mongoose.Schema;
const validator = require('validator');
const JWT_KEY = 'WinterIsComingGOT2020';

const UserSchema = new Schema({
    Name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:255,
    },
    Password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:150,
    },
    Email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:200,
        unique:true,
        lowercase:true,
        validate:value =>{
            if(!validator.isEmail(value)){
                throw new Error({error:'invalid Email adress'})
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

// UserSchema.pre('save',async function(next){
//     const user = this;
//     user.Password = await bcrypt.hash(user.Password,10);
//     next()
// })

UserSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id:user._id},JWT_KEY)
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token
}

UserSchema.statics.findByCredentials = async(UserEmail,UserPassword)=>{
    const user = await User.findOne({Email:UserEmail});
    if(!user){
        throw new Error({error:'Invalid login'});
    }
    const isPasswordMatch = await bcrypt.compare(UserPassword,user.Password);
    if(!isPasswordMatch){
        console.log('invalid password',UserPassword,user.Password);
        throw new Error({error:'Invalid password'})
    }
    return user
}

const User =  mongoose.model('User',UserSchema);

module.exports = User;