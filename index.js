const express=require("express");
const path=require("path");
const cookieparser=require("cookie-parser");
const{ConnectToMongo}=require("./connect");
const URL=require("./models/url");

const userroutes=require("./routes/user")
const urlroutes=require("./routes/url");
const staticroute=require("./routes/staticroutes")
const {restricttologgedinuseronly}=require("./middlewares/auth");



const bodyParser = require('body-parser')
const app=express();
const port=8003;

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieparser());
app.use(bodyParser.json());
app.use(express.json());

ConnectToMongo("mongodb://127.0.0.1:27017/My-urls").then(()=>console.log('MongoDb Started'));

app.use("/url",restricttologgedinuseronly,urlroutes);
app.use("/",staticroute);
app.use("/user",userroutes);

app.get("/home",async(req,res)=>{
    const allurls=await URL.find({});
    return res.render("home",{
        urls:allurls,
    });
});


app.get("/url/:shortId", async(req,res)=>{
    const shortId=req.params.shortId;
     const entry=await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
            visitHistory:{
                timestamp:Date.now(),
            },
        }
    });
    res.redirect(entry.redirectURL);
});
 



app.listen(port,()=>console.log(`Server started at:${port}`));