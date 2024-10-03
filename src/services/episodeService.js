const { where } = require('sequelize/lib/sequelize');
const db = require('../models/index');

const getbyMovieId = async(id)=>{
    try{
        // lấy episode
        let episode = await db.Episode.findAll({
            where: {  movieId:id},
            include: {model: db.Movie, attributes:["name"]},
            order: [
            ['slug', 'ASC'],
        ],
        })
        let movie = await db.Movie.findOne({
            where: {id: id},
            attributes:["name"]
        })
        console.log(episode)
        // return dữ liệu
        if(episode && episode.length>0){
            return {
                EM:"Get tập phim success ",
                EC:0,
                DT: {episode:episode,
                    name : movie.name
                }
            }
        }
        else{
                 return {
                    EM:"Phim chưa cập nhật",
                    EC:0,
                    DT: 
                        {episode:[],
                        name : movie.name
                       }
                    }
            }

    }
    catch(e){
        console.log(e);
        return{
            EM:"Get episode not success ",
            EC:1,
            DT: []
        }
    }
}

const createEpi = async(data)=>{
    try{
        let epi = await db.Episode.findOne({
            where:{
                movieId: data.movieId,
                slug: data.slug
            }
        })
        if(!epi){
            await db.Episode.create({
                movieId: data.movieId,
                name:data.name,
                slug: data.slug,
                ep_url: data.ep_url
            })
            return{
                EM: 'Thêm tập thành công',
                EC: 0,
                DT:""
            }
        }
        else{
            return{
                EM: `Tập ${data.slug} đã tồn tại`,
                EC: 1,
                DT:""
            }  
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

const updateEpi = async (data)=>{
    try{
        let epi = await db.Episode.findOne({
            where:{
                id: data.id
            }}
        )
        if(epi){
            await epi.update({
                name: data.name,
            })
            
            return {
                EM:"Cập nhật tập phim thành công",
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
        return {
            EM:'Lỗi với  sever',
            EC: 1,
             DT:""
        }
    }
}

const deleteEpi = async(id)=>{
    try{
        await db.Episode.destroy({
            where:{id: id}
        });
        return {
            EM:"Xóa tập phim thành công",
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
module.exports={getbyMovieId,createEpi,updateEpi,deleteEpi}