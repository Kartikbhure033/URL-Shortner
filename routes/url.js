const express=require("express");
const{handlecreatenewId,handleanalytics}=require("../controllers/url");

const router=express.Router();

router.post("/",handlecreatenewId);

router.get("/analytics/:shortId",handleanalytics);

module.exports=router;