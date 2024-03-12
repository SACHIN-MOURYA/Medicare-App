const dotenv=require("dotenv");
const express=require("express");
const cookieParser = require("cookie-parser");
// const { default: mongoose } = require("mongoose");
const app=express();
app.use(cookieParser());

dotenv.config({path:'./config.env'});
require('./database/db');
const User=require('./model/userschema');

app.use(express.json());
app.use(require('./router/auth'));
const port=process.env.PORT;

// //middleware
// const middleware=(req,res,next)=>{
//     console.log("Middle State");
//     next();
// }

// app.get('/',(req,res)=>{
//     res.send("Hello Wolrd in index/home");
// });

// app.get('/about',(req,res)=>{
//     console.log("About");
//     res.send("Hello in about");
// })
app.listen(port,()=>{
    console.log(`Server is Running at port no ${port}`);
});