const express       = require('express');
const router        = express.Router();
const bodyParser    = require("body-parser");
const User          = require('../models/Users');
const bcrypt   = require('bcryptjs');
const jsonParser = express.json();

const urlencodedParser = bodyParser.urlencoded({extended: false});


router.get('/SignUp',(req,res)=>{
    res.render('SignUp',{
        title:'Регистрация'
    })
})
router.get('/Login',(req,res)=>{
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
router.post('/Login',jsonParser, async(req,res)=>{
    try {
        const  Email    = req.body.Email;
        const  Password = req.body.Password;
        console.log(Password,Email);
        const user = await User.findByCredentials(Email,Password);
        if (!user) {
            res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.status(200).send(token);
    } catch (error) {
        res.status(400).send(error)
        // console.log("error");
    }
})
module.exports = router;
