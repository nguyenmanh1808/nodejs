const { name } = require('ejs');
const connection = require('../config/DB');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const db = require('../models/index');
const { raw } = require('express');
const { where } = require('sequelize/lib/sequelize');
   

///////////////////
const getALlUsers = async () => {

// test relationship
    let newUser = await db.User.findOne({
        where: {id:1},
        attributes:["id","email","username","groupId"],
        include: {model: db.Group, attributes:["id","name","description"] },
        raw: true,
        nest: true
    })

    // let roles = await db.Group.findAll({
    //     include:db.Role, where: {id: 1 } ,
    //     raw: true,
    //     nest: true
    // })
    console.log("check user",newUser);
    // console.log("check role",roles);

   let users = [];
   users = db.User.findAll();
    return users;
}
const getUserByID = async(id) => {
    let user = {}
    user = await db.User.findOne({ where: { id: id } });
    return user;
}

/////////////
const hashUserPassword = (uerPassword) =>{
    let  hashPassword = bcrypt.hashSync(uerPassword, salt);
    return hashPassword;
}

const creNewUers = async (email, password, userName)=>{
    let hashPassword = hashUserPassword(password);
    await  db.User.create({
        email: email,
        password: hashPassword,
        username: userName
    })
    
}
const updateUserInfor = async (email,name,password,id) =>{
    let hashPassword = hashUserPassword(password);
    await db.User.update(
        { email: email,
          password: hashPassword,
          username: name
         },
        {
          where: {
            id: id,
          },
        },
      );
}

const deleteUser = async (id) => {
    await db.User.destroy({
        where: {id: id}
    })
}


module.exports = {
    creNewUers,deleteUser,getUserByID,updateUserInfor,getALlUsers
}