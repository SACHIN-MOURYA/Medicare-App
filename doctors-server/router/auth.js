const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
// const jwt=require("bcryptjs");

require('../database/db');
const User=require("../model/userschema");
const Doctor=require("../model/doctorschema");
const Authenticate = require('../middleware/authentication');

router.get('/',(req,res)=>{
    res.send("Hello Wolrd in router/auth/home");
});

// router.post('/register',(req,res)=>{
//     const {name ,email, phone, work, password, cpassword}=req.body;
//     if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.json({error:"plz filled the filed properly"});
//     }
//     User.findOne({email:email})
//         .then((userExit)=>{
//             if(userExit){
//                 return res.status(422).json({error:"Email already exists"});
//             }
//             const user = new User({name,email,phone,work,password,cpassword});
//             user.save().then(()=>{
//                 res.status(201).json({message:"registered successfully"});
//             }).catch((err)=>res.status(500).json({error:"Failed to registered"}));
//         }).catch(err=>{console.log(err);});
// });

router.post('/signup',async(req,res)=>{
    const {name ,email, phone, password, cpassword}=req.body;
    console.log(req.body);
    if(!name || !email || !phone || !password || !cpassword){
        console.log(name);
        console.log(email);
        console.log(phone);
        console.log(password);
        console.log(cpassword);
        return res.json({error:"plz filled the filed properly"});
    }
    try{
        const userExit=await User.findOne({email:email});
        if(userExit){
            return res.status(422).json({error:"Email already exists"});
        }
        else if(password!=cpassword){
            return res.status(422).json({error:"password not mached"});
        }
        else{
            const user = new User({name,email,phone,password,cpassword});
            await user.save();
            res.status(201).json({message:"registered successfully"});
        }
    }
    catch(err){
        console.log(err);
    }
});

router.post('/login',async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({error:"plz fill the data"});
        }

        const userLogin=await User.findOne({email:email});
        // console.log(userLogin);
        if(userLogin){
            const isMatch=await bcrypt.compare(password,userLogin.password);
            const token=await userLogin.generateAuthToken();
            console.log(token);
            //cookie
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+25892000000),
                httpOnly:true
            });
            
            if(!isMatch){
                res.status(400).json({error:"Invalid Credential"});
            }
            else{
                res.json({message:"user login successfull"});
            }
        }
        else{
            res.status(400).json({error:"Invalid Credential"});
        }
    }catch(err){
        console.log(err);
    }
});
router.post('/doctorsignup',async(req,res)=>{
    const {name ,email, phone, specalist, password, cpassword}=req.body;
    if(!name || !email || !phone || !specalist || !password || !cpassword){
        console.log(name);
        console.log(email);
        console.log(phone);
        console.log(specalist);
        console.log(password);
        console.log(cpassword);
        return res.json({error:"plz filled the filed properly"});
    }
    try{
        const doctorExit=await Doctor.findOne({email:email});
        if(doctorExit){
            return res.status(422).json({error:"Email already exists"});
        }
        else if(password!=cpassword){
            return res.status(422).json({error:"password not mached"});
        }
        else{
            const doctor = new Doctor({name,email,phone,specalist,password,cpassword});
            await doctor.save();
            res.status(201).json({message:"registered successfully"});
        }
    }
    catch(err){
        console.log(err);
    }
});

router.post('/doctorlogin',async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({error:"plz fill the data"});
        }

        const doctorLogin=await Doctor.findOne({email:email});
        // console.log(userLogin);
        if(doctorLogin){
            const isMatch=await bcrypt.compare(password,doctorLogin.password);
            const token=await doctorLogin.generateAuthToken();
            console.log(token);
            //cookie
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+25892000000),
                httpOnly:true
            });
            
            if(!isMatch){
                res.status(400).json({error:"Invalid Credential"});
            }
            else{
                res.json({message:"user login successfull"});
            }
        }
        else{
            res.status(400).json({error:"Invalid Credential"});
        }
    }catch(err){
        console.log(err);
    }
});

router.get('/about',Authenticate,(req,res)=>{
    console.log("About");
    res.send(req.rootUser);
});

router.get('/logout',(req,res)=>{
    console.log("logout page");
    res.clearCookie('jwtoken',{path: '/'});
    res.status(200).send("User Logout");
});
module.exports=router;