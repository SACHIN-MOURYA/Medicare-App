const { default: mongoose } = require("mongoose");

const DB = process.env.DATABASE;

mongoose.connect(DB,{
}).then(()=>{
    console.log('connection successfull');
}).catch((err)=> console.log("no connection"));
//middleware
// const middleware=(re,res,next)=>{
//     console.log("Middle State");
//     next();
// }