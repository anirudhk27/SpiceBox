const express= require('express')
const router= express.Router()
const User= require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt=require("bcryptjs");
const jwt= require("jsonwebtoken");
router.post("/CreateUser",[
    body("email").isEmail(),
    body('password','Incorrect Password').isLength({min:5}),
    body('name','Too Small Name').isLength({min:5})
    ],
    async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt= await bcrypt.genSalt(10);
    let secPass= await bcrypt.hash(req.body.password,salt);
    try{
        await User.create({
            name:req.body.name,
            password:secPass,
            email:req.body.email,
            location:req.body.location
        })
    res.json({success:true});
    }catch(err)
    {
        console.log(err);
    res.json({success:false});

    }
});

module.exports= router;