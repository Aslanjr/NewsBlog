const express       = require('express');
const router        = express.Router();
const User          = require('../models/Users').User;
const auth          = require('../middleware/auth');

router.get('/',auth,(req,res)=>{
    if(!req.user){
        res.status(400).send({error:'Not find User'});
    }
    res.send(req.user);
})

module.exports = router;
