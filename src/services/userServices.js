const { name } = require('ejs');
const connection = require('../config/DB');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
   
const hashUserPassword = (uerPassword) =>{
    let  hashPassword = bcrypt.hashSync(uerPassword, salt);
    return hashPassword;
}

const creNewUers = async (email, password, userName)=>{
    
    
    let hashPassword = hashUserPassword(password);
    
    let [results, fields] = await connection.query(`insert into users(email,username,password) values (?,?,?);`, [email, userName, hashPassword]);
    return results;
}

const deleteUser = async (id) => {
    let [results, fields] = await connection.query(`delete from users where id = ?`,[id]);
    return results;
}
const getUserByID = async(id) => {
    let [results, fields] = await connection.query(`select * from users where id = ?`,[id]);
    return results;
}
const updateUserInfor = async (email,name,password,id) =>{
    let [result,fields] = await connection.query(`update users set email = ?,username = ?,password = ? where id = ?`,[email,name,password,id])
    return result;
}
module.exports = {
    creNewUers,deleteUser,getUserByID,updateUserInfor
}