const { where } = require('sequelize/lib/sequelize');
const db = require('../models/index');
const { Op } = require('sequelize');
const {veryfyToken} = require('../middleware/jwtAction')
const getComment = async()=>{
    try{ 
        let data = await db.Comment.findAll({
            attributes:["id","content"],
            include: [
                {
                    model: db.User,attributes:["username"]
                },
                {
                    model: db.Movie,attributes:["name"]/* ... */
                }
              ]
        });
        return {
            EM:"lấy comment thành công",
            EC:0,
            DT:data
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
const getCommentPatination = async (page,limit)=>{
    try{
       let offset = (page-1)*limit;
       const { count, rows } = await db.Comment.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes:["id","content"],
            include: [
                {
                    model: db.User,attributes:["username"]
                },
                {
                    model: db.Movie,attributes:["name"]/* ... */
                }
              ]
        });
        let totalPages = Math.ceil(count/limit)
        let data = {
            totalRows:count,
            toatalPage: totalPages,
            comment: rows
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
const deleteComment = async(id)=>{
    try{
        await db.Comment.destroy({
            where:{id: id}
        });
        return {
            EM:"Xóa comment thành công",
            EC:0,
            DT:[]
        }
}
catch(e){
    console.log(e);
    return {
        EM:"Lỗi server",
        EC:1,
        DT:data
    }
}
}

const getCommentByMovieId = async(id)=>{
    try{ 
        let data = await db.Comment.findAll({
            where: {movieId:id},
            attributes:["id","content"],
            include: [
                {
                    model: db.User,attributes:["username"]
                }
              ]
        });
        return {
            EM:"lấy comment thành công",
            EC:0,
            DT:data
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

// create comment
const createComment = async(data)=>{
    try{
        let dataUser = veryfyToken(data.token);
        let user = await db.User.findOne({
        where : {email: dataUser.email}
        })

        await db.Comment.create({
            userId: user.id,
            movieId:data.movieId,
            content: data.content
        })
        return{
            EM: 'Tạo mới bình luận thành công',
            EC: 0,
            DT:""
        }
    }
    catch(e){
        console.log(e);
        return {
            EM:'Lỗi với  sever',
            EC: 1,
             DT:""
        }
    }
}
module.exports = {
    getComment,getCommentPatination,deleteComment,getCommentByMovieId,createComment
}