const jwt= require('jsonwebtoken');
const mongoose= require('mongoose');
const User =mongoose.model('User');

module.exports=(req,res,next)=>{
     const {authorization}=req.headers;

     if(!authorization)
     {
        res.status(403).send({error:'you must be logged in other device'})
    
     }
     const token=authorization.replace('Bearer ', '')
     jwt.verify(token,'MY_SECRET_KEY',async (err,payload)=>{ 
        if (err){
            return res.status(402).send({error:'you must be logged in'})
        }

        const {userId}=payload ;

        const user=await User.findById(userId)
         req.user = user;
         next();


     })
}
