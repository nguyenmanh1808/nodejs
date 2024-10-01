const { where } = require('sequelize/lib/sequelize');
const db = require('../models/index')
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

// check email trùng
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
//////////////////////////
const getAllUser = async ()=>{
        try{
            
            let users = await db.User.findAll({
                attributes:["id","email","username","groupId","age"],
                include: {model: db.Group, attributes:["id","name","description"] }
              
            });
            if(users){
                return {
                    EM:"Get data success",
                    EC:0,
                    DT:users
                }
            }
            else{
                return {
                    EM:"Get data success",
                    EC:0,
                    DT:[]
                }
            }
           
        }
        catch(e){
            return {
                EM:"Something wrongs with sevice",
                EC:1,
                DT:[]
            }
        }
}

const getUserPatination = async (page,limit)=>{
    try{
       let offset = (page-1)*limit;
       const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes:["id","email","username","groupId","age","sex"],
            include: {model: db.Group, attributes:["id","name","description"] }
        });
        let totalPages = Math.ceil(count/limit)
        let data = {
            totalRows:count,
            toatalPage: totalPages,
            user: rows
        }
        return {
            EM:"ok",
            EC:0,
            DT:data
        }
    }
    catch(e){
        console.log(e)
        return {
            EM:"Something wrongs with sevice",
            EC:1,
            DT:data
        }
    }
}
const createNewUser = async (data)=>{
        try{
             //check email,
            let isEmailExist =await checkEmail(data.email);
            if(isEmailExist === true){
                return {
                    EM: 'Email đã tồn tại',
                    EC: 1,
                    DT:""
                }
            }
            
            //hash password
            let hashPassword = hashUserPassword(data.password);
            let dataUser = {...data,password:hashPassword}
            await db.User.create(dataUser)
            return {
                EM:"Tạo mới người dùng thành công",
                EC:0,
                DT:""
            }
        }
        catch(e){
            console.log(e)
        }
}

const updateUser = async (data)=>{
    try{
        let user = await db.User.findOne({
            where:{id:data.id}
        })
        if(user){
            await user.update({
                username: data.username,
                age: data.age,
                sex: data.sex,
                groupId: data.groupId
            })
            
            return {
                EM:"Cập nhật người dùng thành công",
                EC:0,
                DT:""
            }
        }
        else{
             return {
                EM:"Lỗi kết nối database",
                EC:1,
                DT:""
            }
        }
    }
    catch(e){
        console.log(e)
        return {
            EM:"Lỗi kết nối database",
            EC:1,
            DT:""
        }
    }
}

const deleteUser = async(id)=>{
    try{
            await db.User.destroy({
                where:{id: id}
            });
            return {
                EM:"Xóa người dùng thành công",
                EC:0,
                DT:[]
            }
    }
    catch(e){
        console.log(e);
        return {
            EM:"Something wrongs with sevice",
            EC:1,
            DT:data
        }
    }
}

module.exports ={
    getAllUser,createNewUser,updateUser,deleteUser,getUserPatination
}