const express=require('express');
const User = require('../models/User');
const { body,validationResult } = require('express-validator');
const router= express.Router();


router.post("/createuser",[
    body('email').isEmail(),
    body('name').isLength({min:5}),
    body('password','Incorrect password').isLength({min:5})
],
async(req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        await User.create({
            name:req.body.name,
            email:req.body.email,
            location:req.body.location,
            password:req.body.password
        })
        res.json({success:true});
    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
})

router.post("/loginuser",[
    body('email').isEmail(),
    body('password','Incorrect password').isLength({min:5})
],
async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

let email=req.body.email;
    try {
       let user=await User.findOne({email});
       if(!user){
        return res.status(400).json({errors:"Try logging with correct credentials"});
       }
       if(user.password!==req.body.password){
        return res.status(400).json({errors:"Try logging with correct credentials"});
       }
        res.json({success:true});
    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
})

module.exports=router;