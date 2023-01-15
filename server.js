const express = require("express");
const path = require("path");
const {Storage} = require("@google-cloud/storage");
require("dotenv").config();
const Multer = require("multer");
const mongoose = require("mongoose");
const shortid = require("shortid");
const connectDb = require("./connect");
const URLSchema = require("./models/URLSchema");
const cors = require("cors");
const formidable = require("formidable");
    
const storage = new Storage({
    projectId : process.env.PROJECT_ID,
    keyFilename:"gcs-key.json",
}); 

const bucket = storage.bucket(process.env.BUCKET_NAME);

const multer = Multer({
    storage:Multer.memoryStorage()
});
 
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

const start =  async() =>{
    try{
        await connectDb(process.env.CONNECTION_URL);
        app.listen(PORT,(req,res)=>{
            console.log(`server running on port ${PORT}`);
        });
        console.log("Database connected");
    }
    catch(err)
    {
        console.log(err);
    }
}

app.use(express.static(path.join(__dirname,'/public')));
 
app.get("/|index.html",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"index.html"));
}) 

app.post("/uploadFile",multer.single('file-to-be-uploaded'),

async (req,res,next)=>{
    if(req.file)
    { 
        console.log("post method");
        const blob = bucket.file(req.file.originalname);
        const blobStream = blob.createWriteStream();
        blobStream.on('error',err=>{
            console.log(err);
        })
        blobStream.on("finish",async ()=>{ 
            const url = `https://storage.googleapis.com/${process.env.BUCKET_NAME}/${req.file.originalname}`
            req.url = url;
            console.log(req.url);
            //insert into mongodb
            const fileID = shortid();
            const document  = {short_id:fileID,long_url : url};
            await URLSchema.create(document);
            console.log(`Status : File uploaded fileId : ${fileID} url:${url}`)
            return res.status(200).json({status:"File Uploaded",message:fileID});

        })  
        blobStream.end(req.file.buffer);
    } 
    else{
        return res.status(400).json({status :"NO files Received",message:"Select atleast one file"});
    }
}) 

app.post("/DownloadFile", async (req,res)=>{
    const form = formidable({multiples:true});
    var data = {};
    await form.parse(req,(err,fields,files)=>{
        data["fileID"] = fields.fileID;
    });
    const fileID = data["fileID"];
    const doc = await URLSchema.findOne({"short_id":`${fileID}`});
    console.log(doc);
    if(doc !== null)
    {
        const fileURL = doc["long_url"];
        const fileName = fileURL.split("/")[4];
        var DAY_IN_MS = 24 * 60 * 60 * 1000;
        const createdtime = doc["createdAt"].getTime();
        const timeNow = new Date().getTime();
        console.log(timeNow-createdtime > 60000)
        if(timeNow-createdtime > 600000)
        {
            return res.status(200).send({status:"200",message:"CODE Expired"});
        }
        else{
            return res.status(200).send({status: "200", message:`${fileURL}`});
        }
        
    }
    else{ 
        console.log(new Date());
        console.log("Null document");
        return res.status(200).send({message:"Invalid CODE Entered"});
    }
   
})
 


 

start();   