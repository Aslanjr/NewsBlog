const express       = require('express');
const router        = express.Router();
const bodyParser    = require("body-parser");
const User          = require('../models/Users');
const bcrypt        = require('bcryptjs');
const jsonParser    = express.json();


const urlencodedParser = bodyParser.urlencoded({extended: false});


router.get('/SignUp',(req,res)=>{
    res.render('SignUp',{
        title:'Регистрация'
    })
})
router.get('/Login',(req,res)=>{
    console.log(req.sessionID)
    res.render('Auth',{
        title:'Авторизация'
    })
})
router.post('/SignUp',urlencodedParser, async (req,res,next)=>{
    try {
        const UserPassword = await bcrypt.hash(req.body.Password,10);
        const user = new User({
            Name:req.body.Name,
            Password:UserPassword,
            Email:req.body.Email
        })
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
        // console.log(error.message);
    }
})
router.post('/Login',urlencodedParser, async(req,res)=>{
    try {
        const  Email    = req.body.Email;
        const  Password = req.body.Password;
        console.log(Password,Email);
        const user = await User.findByCredentials(Email,Password);
        if (!user) {
            res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken();
        console.log(token);
        res.status(200).cookie("access_token", token,{
            expires:new Date(Date.now() + 8 *3600000)
        })
        .redirect(301,'/Api/Main')
    } catch (error) {
        res.status(400).send(error)
        // console.log("error");
    }
})
module.exports = router;
