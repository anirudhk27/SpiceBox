const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt=require("bcryptjs");
const jwtSecret="sdvfbhlewuiksvdlbhj";
const jwt= require("jsonwebtoken");
router.post("/LoginUser", [
    body("email").isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email
        let pass=req.body.password 
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Try logging in with correct credentials" })
            }
            const pwdCompare=await bcrypt.compare(pass,userData.password);
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try logging in with correct credentials" })
            }
            const data={
                user:{
                    id:userData.id
                }
            }
            const authToken=jwt.sign(data,jwtSecret)            
            return res.json({ success: true ,authToken:authToken});
        } catch (err) {
            console.log(err);
            res.json({ success: false });

        }
    });

module.exports = router;





