require('./models/Users')
require('./models/Track')
const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const authRoutes=require('./routes/authRoutes')
const trackRoutes=require('./routes/trackRoutes')
const requireAuth=require('./middlewares/requireAuth')

const app=express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri='mongodb+srv://malikakshit02:akshitmalik@cluster0.fio0cid.mongodb.net/'
mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected',()=>{
    console.log('connected to mongo instance')
})

mongoose.connection.on('error',(err)=>{
    console.error('error connecting to mongo',err)
})
 
app.get('/',requireAuth,(req,res)=>{
    res.send(`${req.user.email} `);
});

app.listen(3005,()=>{
    console.log('listening on port 3005')
});


