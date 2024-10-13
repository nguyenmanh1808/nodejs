const db = require('../models/index');
const {veryfyToken} = require('../middleware/jwtAction')
const { Op } = require('sequelize');

const getMovieHistory = async(data)=>{
    try{
        let dataUser = veryfyToken(data);
        let user = await db.User.findOne({
        where : {email: dataUser.email}
        })

        let listMovie = await db.History.findAll({
            where:{
                userId: user.id,
            },
            include: {model: db.Movie},
            order: [
                ['createdAt', 'DESC'],
            ],
            
        })
        return{
            EM: ' Thành công',
            EC: 0,
            DT: listMovie
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

const createHistoryMovie = async(data)=>{
    try{
        let dataUser = veryfyToken(data.token);
        let user = await db.User.findOne({
        where : {email: dataUser.email}
        })

        // lấy sanh sach lịch sử xem
        let listMovieHistory = await db.History.findAll();
        //lấy phim xem đầu
        let time = await db.History.min('createdAt')
        
        let movieHistory = await db.History.findOne({
            where:{
                movieId: data.movieId
            }
        })
      
        // điều kiện 
            // nếu id phim đã tồn tại
        if(movieHistory){
           
            await db.History.destroy({
                    where:{ movieId: data.movieId}
            });
            await db.History.create({
                    userId: user.id,
                    movieId:data.movieId,
                    slug: data.slug
            })
            return{
                EM: 'Tạo thành công',
                EC: 0,
                DT:""
            }
        }
            // id phim chưa tồn tại
        else{
             if(listMovieHistory.length >= 6){
               
                await db.History.destroy({
                        where:{
                            createdAt : time
                        }
                    })
                    await db.History.create({
                        userId: user.id,
                        movieId:data.movieId,
                        slug: data.slug
                    })
                    return{
                        EM: 'Tạo thành công',
                        EC: 0,
                        DT:""
                    }
            }
            else{
               
                await db.History.create({
                        userId: user.id,
                        movieId:data.movieId,
                        slug: data.slug
                    })
                    return{
                        EM: 'Tạo thành công',
                        EC: 0,
                        DT:""
                }
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
module.exports ={
    getMovieHistory,createHistoryMovie
}