const jwt = require('jsonwebtoken');
require("dotenv").config();

const createJwt = (payload) =>{
    let key = process.env.JWT_SECRET
    let token = null;
    try{
       token = jwt.sign(payload,key );
    }
    catch(e){
        console.log(e)
    }
    return token
}

const veryfyToken = (token)=>{
    let key = process.env.JWT_SECRET;
    let decoded = null
    try{
         decoded =jwt.verify(token, key);

    }
    catch(e){
        console.log(e);
    }

    return decoded;

}
//// midle ware
const noCheck = ['/','/register','/login','/movie/read'];

const checkUserJWT = (req,res,next)=>{
    if(noCheck.includes(req.path)) return next();
    let cookie = req.cookies;
    if(cookie && cookie.jwt){
        let decoded = veryfyToken(cookie.jwt)
       if(decoded){
        req.user = decoded; 
        next();
       }
       else{
        return res.status(401).json({
            EC:-1,
            DT:"",
            EM:"Not authen user"
        })
       }
    }
    else{
        return res.status(401).json({
            EC:-1,
            DT:"",
            EM:"Not authen user"
        })
    }
    
}

const checkUserPermision = (req,res,next)=>{
    if(noCheck.includes(req.path)) return next();
    if(req.user) {
        let email = req.user.email;
        let roles = req.user.data.Roles;
        let currentURL = req.path;
        if(!roles || roles.length === 0){
            return res.status(403).json({
                EC:-1,
                DT:"",
                EM:"Bạn chưa được cấp quyền"
            })
        } 
        let    canAccess = roles.some(item => item.url === currentURL);
        if(canAccess === true){
            next();
        } 
        else{
            return res.status(403).json({
                EC:-1,
                DT:"",
                EM:"Bạn chưa được cấp quyền"
            })
        }
    }
    else{
        return res.status(401).json({
            EC:-1,
            DT:"",
            EM:"Not authen user"
        })
    }
}
module.exports = {
    createJwt,veryfyToken,checkUserJWT,checkUserPermision
}