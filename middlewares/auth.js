const{gettUser}=require("../Service/auth");

async function restricttologgedinuseronly(req,res,next){
    const userUid=req.cookies?.uid;

    if(!userUid) return res.redirect("/login");
    const user=gettUser(userUid);

    if(!user)return res.redirect("/login");

    req.user=user;
    next();
}

module.exports={
    restricttologgedinuseronly,
}