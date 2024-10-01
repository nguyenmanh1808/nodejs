
const db = require('../models/index');
const { Op } = require('sequelize');

const getAllCategory = async()=>{
    try{
            // lấy category
        let category = await db.Category.findAll({
            include: {model: db.Movie}
        })
        // return dữ liệu
        if(category && category.length>0){
            return {
                EM:"Get category success ",
                EC:0,
                DT: category
            }
       }
       else{
            return {
                EM:"Get category not success ",
                EC:1,
                DT: []
            }
       }
    }
    catch(e){
        console.log(e);
        return{
            EM:"Get category not success ",
            EC:1,
            DT: []
        }
    }
}

const getCategoryByMovieId = async(movieId)=>{
    try{
            // lấy idcategory
        let data = await db.Category_movie.findAll({
            where: {movieId: movieId},
                attributes:["categoryId"] 
        });
        let categoryId = data.map((item)=>{
            return item.categoryId
        })

         // lấy category
        let category = await db.Category.findAll({
            where: {
                id:{
                    [Op.or] : categoryId
                }
            }
        })
        // return dữ liệu
        if(data && data.length>0){
            return {
                EM:"Get category success ",
                EC:0,
                DT: category
            }
       }
       else{
            return {
                EM:"Get category not success ",
                EC:1,
                DT: []
            }
       }

    }
    catch(e){
        console.log(e);
        return{
            EM:"Get category not success ",
            EC:1,
            DT: []
        }
    }
}

const getCategoryById = async (id)=>{
    try{
        // lấy category
    let category = await db.Category.findOne({
        where: {id: id},
        include: {model: db.Movie}
    })
    // return dữ liệu
    if(category ){
        return {
            EM:"Get category success ",
            EC:0,
            DT: category
        }
   }
   else{
        return {
            EM:"Get category not success ",
            EC:1,
            DT: []
        }
   }
}
catch(e){
    console.log(e);
    return{
        EM:"Get category not success ",
        EC:1,
        DT: []
    }
}
}

const createCategory = async(data)=>{
    try{
       await db.Category.create({
            name:data
       })
       return {
        EM:"Tạo mới thể loại thành công",
        EC:0,
        DT:""
    }
    }
    catch(e){
        console.log(e);
        return{
            EM:"Lỗi sever",
            EC:1,
            DT:""
        }
    }
    
}
const updateCategory = async(data)=>{
    try{
        let category = await db.Category.findOne({
            where:{id:data.id}
        })
        if(category){
            await category.update({
                name: data.name,
           })
           return {
            EM:"Cập nhật thành công",
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
         console.log(e);
         return{
             EM:"Lỗi sever",
             EC:1,
             DT:""
         }
     }
}

const deleteCategory = async(id)=>{
    try{
        await db.Category.destroy({
            where:{id: id}
        });
        return {
            EM:"Xóa thể loại dùng thành công",
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
module.exports = {getCategoryByMovieId,getAllCategory,getCategoryById,createCategory,updateCategory,deleteCategory}