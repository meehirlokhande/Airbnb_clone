const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser= require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const place = require('./models/places');
const path = require('path');
const connectDB = require('./db');
const jwt = require('jsonwebtoken');
const PlaceModel = require('./models/places');
const JWTSECRET = "DJABDKJABDKJBWDlkfanhuqehfaniehfqfqo"
const bcryptSalt = bcrypt.genSaltSync(10);
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin:"http://localhost:5173",
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

require('dotenv').config();

//Database connection
connectDB();



//Routes

// testing route
app.get('/test',(req,res)=>{
    res.json('test ok');
});

// register route
app.post('/register',async (req,res)=>{
    const {name,email,password} = req.body;
try{
    const hashedPassword= bcrypt.hashSync(password, bcryptSalt);
    const userDoc =  await User.create({
       name,
       email,
       password:hashedPassword, 
        // password,
    });
    res.json(userDoc);
}catch(err){
    res.status(422).json(err);
}
    
});

// Login route

app.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if(userDoc){
        const passOk = bcrypt.compareSync(password,userDoc.password);
        if(passOk){
            jwt.sign({email:userDoc.email,id:userDoc._id,name:userDoc.name},JWTSECRET,{},(err,token)=>{
                if(err){
                    throw err;
                }
                res.cookie('token',token).json(userDoc);
            })
            
        }else{
            res.status(422).json('password is not okay');
        }
    }else{
        res.json('user not found');
    }
});

app.get('/profile',(req,res)=>{
    const {token} = req.cookies;
    if(token){
        jwt.verify(token,JWTSECRET,{},async (err,userData)=>{
            if(err) throw err;
            const {name,email,_id} = await User.findById(userData.id);
            res.json({name,email,_id});
        });
    }else{
        res.json(null);
    }
});

app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);
});

app.post('/upload-by-link', async(req,res) =>{
    
    const {link} = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    const dest = path.join(__dirname, 'uploads', newName);
    await imageDownloader.image({
        url:link,
        dest:dest,
    });
    res.json(`/uploads/${newName}`);
    
});

const photosMiddleware = multer({dest:'uploads/'});
app.post('/upload',photosMiddleware.array('photos', 100),(req,res) => {
    const uploadedFiles = [];
    for(let i=0;i<req.files.length;i++)
    {
        const {path:filePath,originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = `${filePath}.${ext}`;
        fs.renameSync(filePath,newPath);
        uploadedFiles.push(`/uploads/${path.basename(newPath)}`);
        console.log(`File uploaded: ${newPath}`);

    }
    
    res.json(uploadedFiles);
});

app.post('/places',  (req,res) =>{
    const {token} = req.cookies;
    const {title,address,photos:addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests} = req.body;
    jwt.verify(token,JWTSECRET,{}, async (err,userData)=>{
        if(err) throw err;
    
    const placeDoc = await place.create({
        owner: userData.id,
        title,address,photos:addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price
    });
    // console.log(`Place created: ${placeDoc}`); // Debugging log
    res.json(placeDoc);
});
});

app.get('/user-places',(req,res) =>{
    const {token} = req.cookies;
    jwt.verify(token,JWTSECRET,{}, async (err,userData) =>{
        const {id} = userData;
        const places = await place.find({owner:id});
        // console.log(`Places retrieved: ${places}`); // Debugging log
        res.json(places);
    });
})


app.get('/places/:id',async(req,res) => {
    const {id} = req.params;
    res.json(await place.findById(id));
})

app.put('/places/:id',async(req,res) => {
    const {id} = req.params;
    const {token} = req.cookies;
    // console.log("request : ", req.body)

    const {title,address,addedPhotos:photos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price} = req.body;

    const placeDoc = await place.findById(id);
    jwt.verify(token,JWTSECRET,{}, async (err,userData) =>{
        if(userData.id===placeDoc.owner.toString())
        {
            placeDoc.set(
                {
                   
                    title,address,photos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price
                }
            );

            await placeDoc.save();
            res.json('ok');
        }
    });
})

app.get('/places',async(req,res) =>{
    res.json(await place.find() );
})


app.listen(4000);

