const db = require('../models/index');
const {veryfyToken} = require('../middleware/jwtAction');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

//check passwword
const checkPassword = (inputPassword,hardPassword)=>{
    return bcrypt.compareSync(inputPassword, hardPassword); // true or false
}
// hash pass word
const hashUserPassword = (uerPassword) =>{
    let  hashPassword = bcrypt.hashSync(uerPassword, salt);
    return hashPassword;
}
const getAccount = async(data)=>{
     try{ 
        let dataUser = veryfyToken(data);
        let user = await db.User.findOne({
        where : {email: dataUser.email},
        attributes:["id","email","username","age"]
        })
        return{
            EM: 'Lấy account thành công',
            EC: 0,
            DT:user
        }
    }
    catch(e){
        console.log(e);
        return {
            EM:"Lỗi kết nối database",
            EC: 1,
            DT:""
        }
    }
}

const updaetPassword = async(data)=>{
    try{
        let dataUser = veryfyToken(data.token);
        let user = await db.User.findOne({
            where : {email: dataUser.email},
        })
        let checkpassword = checkPassword(data.oldPass,user.password)
        if(checkpassword === true ){
            let hashPassword = hashUserPassword(data.newPass);
            await user.update({
                password: hashPassword,
            })
            return {
                EM:"Thay đổi mật khẩu  thành công",
                EC:0,
                DT:""
            }
        }
        else{
            return {
                EM:" Mật khẩu không chính xác",
                EC:1,
                DT:""
            }
        }
    }
    catch{
        console.log(e)
        return {
           
            EM: 'Lỗi với sever',
            EC: 1
        }
    }
}
module.exports ={
    getAccount,updaetPassword
}