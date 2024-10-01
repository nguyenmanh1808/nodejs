require("dotenv").config();
const db = require('../models/index')
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const {createJwt}= require('../middleware/jwtAction')

const {getGroupWithRole} = require('./jwtService');

const checkEmail = async (email)=>{
    let user = await db.User.findOne({
        where : {email: email}
    })

    if(user){
        return true;
    }
    else{
        return false;
    }
}
/// hasd password
const hashUserPassword = (uerPassword) =>{
    let  hashPassword = bcrypt.hashSync(uerPassword, salt);
    return hashPassword;
}
const registerUser = async (rawUserData)=>{
    console.log(rawUserData.username)
    try{
        //check email,
        let isEmailExist =await checkEmail(rawUserData.email);
        if(isEmailExist === true){
            return {
                EM: 'Email đã tồn tại',
                EC: 1
            }
        }
        //hash password
        let hashPassword = hashUserPassword(rawUserData.password);
        
        //create user
        await  db.User.create({
            email: rawUserData.email,
            username:rawUserData.username,
            password: hashPassword,
            age:rawUserData.age,
            groupId:2
        })
         return{
            EM: 'Tạo mới người dùng thành công',
            EC: 0.
         }      
        
    }
    catch(e){
        console.log(e);
        return {
            EM:'Lỗi với  sever',
            EC: 1
        }
    }
    
}

const checkPassword = (inputPassword,hardPassword)=>{
    return bcrypt.compareSync(inputPassword, hardPassword); // true or false
}

const handleUserLogin= async(rawData)=>{
    try{
        let user = await db.User.findOne({
            where : {email: rawData.email}
        });

        if(user){
            let checkpassword = checkPassword(rawData.password,user.password)
            if(checkpassword=== true){
                let data =await getGroupWithRole(user)
                    console.log(data)
                let payload= {
                    email: user.email,
                    data,
                    expiresIn: process.env.JWT_EXPIRESIN
                }
                let token = createJwt(payload);
                console.log(token)
                return {
                    EM: 'Đăng nhập thành công',
                    EC: 0,
                    DT:{
                        access_token:token,
                        data,
                        username:user.username
                    }
                }
            }
        }
        
        return {
            EM: 'Tên đăng nhập hoặc mật khẩu không đúng',
            EC: 1
        }             
        
    }
    catch(e){
        console.log(e)
        return {
           
            EM: 'Lỗi với sever',
            EC: 1
        }
    }
}

module.exports = {registerUser,handleUserLogin}