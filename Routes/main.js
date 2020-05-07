const express = require('express');
const router  = express.Router();
const bodyParser = require("body-parser");
const ScienceNews = require('../models/news').ScienceNews;
const AstroNews   = require('../models/news').AstroNews;
const User        = require('../models/Users.js');

const urlencodedParser = bodyParser.urlencoded({extended: false});



router.get('/Main',(req,res)=>{
    res.render("MainForm",{
        title:'Форма',
        Category:'Научных'
    });
})
router.get('/Users',(req,res)=>{
    User.find({},(err,users)=>{
        if(err){
            console.log(err);
            res.send(err);
        }
        res.send(users);
    })
})
router.get('/astrophysics',(req,res)=>{
    res.render("astrophysics",{
        title:'Форма',
        Category:'Астрофизики'
    });
})

router.get('/Astro',(req,res)=>{
    AstroNews.find({},(err,news)=>{
        if(err) console.log(err);
        res.send(news)
    })
})

router.get('/Science',(req,res)=>{
    ScienceNews.find({},(err,news)=>{
        if(err) console.log(err);
        res.send(news)
    })
})



router.post('/Main',urlencodedParser,(req,res)=>{

    let NewsTitle = req.body.title;
    let NewsText  = req.body.text;
    let NewsCategory = req.body.сategory;
    let NewsLink  = req.body.link;

    const news = new ScienceNews({
        title:NewsTitle,
        text:NewsText,
        category:NewsCategory,
        link:NewsLink
    });

    news.save(function(err){
        if(err){
            console.log(err);
        }
        console.log(news);
    })
    res.render("MainForm",{
        title:'Форма',
        Category:'Научных'
    });
})

router.post('/astrophysics',urlencodedParser,(req,res)=>{

    let NewsTitle = req.body.title;
    let NewsText  = req.body.text;
    let NewsCategory = req.body.сategory;
    let NewsLink  = req.body.link;

    const news = new AstroNews({
        title:NewsTitle,
        text:NewsText,
        category:NewsCategory,
        link:NewsLink
    });

    news.save(function(err){
        if(err){
            console.log(err);
        }
        console.log(news);
    })
    res.render("MainForm",{
        title:'Форма',
        Category:'Астрофизики'
    });
})

module.exports = router;