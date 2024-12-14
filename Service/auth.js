const sessionIdtousermap=new Map();

 function SetUser(Id,user){
    sessionIdtousermap.set(Id,user);
 } 
 function gettUser(Id){
     return sessionIdtousermap.set(Id);
 } 

 module.exports={
    SetUser,
    gettUser
 }