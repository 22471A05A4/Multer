const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
const app=express()
const cors=require('cors')
const path=require('path')
const PORT=process.env.PORT
const User=require('./models/UserSchema')
const multer=require('multer')

const MongoUrl=process.env.MONGO_URI;
app.use(express.json())
app.use(cors())
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

try{
     mongoose.connect(MongoUrl)
  console.log(`connected `)
  
}
catch{
    console.log(err)
}

//config multer for file upload
const storage=multer.diskStorage({
    destination:'./uploads',
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'-'+file.originalname)
    }
})
const upload=multer({storage})

//post
app.post('/register',upload.single('file'),async(req,res)=>{
try{
    const { name,email,DOB,residentialAddress,permanentAddress}=req.body;
    const filePath=req.file?req.file.path:null
    const user=new User({
        name,email,DOB,residentialAddress,permanentAddress,filePath
       })
     await user.save()
     res.status(200).send("success")
}
catch(err){
     console.log("error in uploading",err)
     res.status(400).send("error in uploading")
}
})

//get all users
app.get('/users',async(req,res)=>{
    try{
        const user=await User.find()
        res.json(user)
    }
    catch(err){
        console.log(err)
    }
})
app.listen(PORT,()=>{
    console.log("http://localhost:5000")
    
})
