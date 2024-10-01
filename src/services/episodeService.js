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
        let name = await db.Movie.findOne({
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
                    name : name.name
                }
            }
        }
        else{
                 return {
                    EM:"Phim chưa cập nhật",
                    EC:0,
                    DT: 
                        {episode:[],
                        name : name.name
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


module.exports={getbyMovieId}