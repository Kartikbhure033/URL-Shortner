const URL=require("../models/url");
const short=require("short-uuid");


async function handlecreatenewId(req,res){
    const body=req.body;
    if(!body.url)return res.status(400).json({error:"url is required"});
    const shortID=short.generate();
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[],  
        createdBy: req.user._id,
    });
    return res.render("home",{
        id:shortID,
    });
    // return res.json({id:shortID});
}

async function handleanalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    return res.json({
        totalclicks:result.visitHistory.length,
        analytics:result.visitHistory,  
    })
} 
module.exports={
    handlecreatenewId,
    handleanalytics,
}