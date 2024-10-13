
const db = require('../models/index');
const {veryfyToken} = require('../middleware/jwtAction')
const { Op } = require('sequelize');

/// get id film theo category

const getMovies = async ()=>{
    try{
        
            let data = await db.Movie.findAll({
            });
            
           if(data && data.length>0){
                return {
                    EM:"Get movies success ",
                    EC:0,
                    DT: data
                }
           }
           else{
                return {
                    EM:"Get movies not success ",
                    EC:1,
                    DT: []
                }
           }
        
        // data ;à chuõi
        
    }
     catch(e){
        console.log(e)
    }
}

const getMoviesCategory = async(category)=>{
    
        //lấy id category
        let id = await db.Category.findOne({
            where: {name:category},
            attributes:["id","name"],
    })
    
    //lấy id film
        let data = await db.Category_movie.findAll({
            where: {categoryId: id.id},
                attributes:["movieId"] 
        });
        let moviesID = data.map((item)=>{
            return item.movieId
        })
    //lấy movie
       let movies = await db.Movie.findAll({
            where: {
                id:{
                    [Op.or] : moviesID
                }
            }
       })
       console.log(movies)
       if(data && data.length>0){
            return {
                EM:"Get movies success ",
                EC:0,
                DT: movies
            }
       }
       else{
            return {
                EM:"Get movies not success ",
                EC:1,
                DT: []
            }
       }
    
}
const getMoviesById = async (id)=>{
    try{
        
        let data = await db.Movie.findOne({
            where: {id: id}
        });
       
       if(data){
            return {
                EM:"Get movies success ",
                EC:0,
                DT: data
            }
       }
       else{
            return {
                EM:"Get movies not success ",
                EC:1,
                DT: []
            }
       }
    }
    catch(e){
        return{
            EM:"Get movies not success ",
            EC:1,
            DT: []
        }
    }
}

const getMoviesPagnination = async(page,limit)=>{
    try{
        let offset = (page-1)*limit;
        const { count, rows } = await db.Movie.findAndCountAll({
             offset: offset,
             limit: limit,
             include: {model: db.Episode, attributes:["id","name","slug"] }
         });
         let totalPages = Math.ceil(count/limit)
         let data = {
             totalRows:count,
             toatalPage: totalPages,
             movie: rows
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

const getMovieSearch = async(input)=>{
    try{
        
        let data = await db.Movie.findAll({
            where:{
                name:{
                    [Op.like]: `%${input}%`,
                }
               
            }
        });
        
       if(data && data.length>0){
            return {
                EM:"Get movies success ",
                EC:0,
                DT: data
            }
       }
       else{
            return {
                EM:"Get movies not success ",
                EC:1,
                DT: []
            }
       }
    
    // data ;à chuõi
    
}
 catch(e){
    console.log(e)
}
}
///
const createNewMovie = async(data)=>{

    try{
        let idCategory = [...data.categoryId];
        idCategory = idCategory.map((item)=>{
            return (
                {CategoryId:item}
            )
        })
        console.log(idCategory)
        await db.Movie.create({
            name:data.name,
            slug:data.slug,
            description: data.description,
            type: data.type,
            time: data.time,
            status: data.status,
            national: data.national,
            view: data.view,
            ep_curent: data.ep_curent,
            ep_total: data.ep_total,
            url_img: data.url_img,
            actor: data.actor ,
            img_thumb: data.img_thumb,
            year: data.year,
            Category_movies: idCategory
        },{
            include:['Category_movies'],
        },
        )

        return {
            EM:"Tạo mới phim thành công",
            EC:0,
            DT:""
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
const updateMovie = async(data)=>{
    try{
        let movie = await db.Movie.findOne({
            where:{id:data.id}
        })
        await db.Category_movie.destroy({
            where: {MovieId: data.id}
        })
        let arr =[...data.categoryId] ;
        await Promise.all(
            arr.map((item,index) =>{
                 db.Category_movie.create({
                        CategoryId: item,
                        MovieId: data.id
                    })
            })
        )
        if(movie){
            await movie.update({
                name: data.name,
                slug: data.slug,
                description: data.description,
                type: data.type ,
                time: data.time,
                status: data.status,
                national: data.national,
                view: data.view,
                ep_curent: data.ep_curent,
                ep_total: data.ep_total ,
                url_img: data.url_img ,
                actor: data.actor ,
                img_thumb: data.img_thumb,
                year: data.year,
            })
            
            return {
                EM:"Cập nhật phim thành công",
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

const deleteMovie = async(id)=>{
    try{
        await db.Movie.destroy({
            where:{id: id}
        });
        return {
            EM:"Xóa  phim thành công",
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
/// láy danh sách phimyeue thích
const getMovieLike = async (data)=>{
    try{
        let dataUser = veryfyToken(data);
        let user = await db.User.findOne({
        where : {email: dataUser.email}
        })

        let listMovie = await db.Like.findAll({
            where:{
                userId: user.id,
            },
            include: {model: db.Movie}
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

const createLikeMovie = async(data)=>{
    try{
        let dataUser = veryfyToken(data.token);
        let user = await db.User.findOne({
        where : {email: dataUser.email}
        })

        await db.Like.create({
            userId: user.id,
            movieId:data.movieId
           
        })
        return{
            EM: 'Thành công',
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
const deleteLikeMovie = async(data)=>{
    try{
        let dataUser = veryfyToken(data.token);
        let user = await db.User.findOne({
        where : {email: dataUser.email}
        })

        await db.Like.destroy({
            where:{
                userId: user.id,
                movieId:data.movieId
            }
        });
        return {
            EM:" Thành công",
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
// lấy phim theo type
const getMovieType = async (data)=>{
    try{
        let listMovie = await db.Movie.findAll({
            where:{
                type: data,
            }
           
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
//lấy phim theo quốc gia
const getMovieNational = async (data)=>{
    try{
        let listMovie = await db.Movie.findAll({
            where:{
                national: data,
            }
           
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
module.exports ={
    getMovies,getMoviesById,getMoviesPagnination,getMoviesCategory,
    createNewMovie,updateMovie,deleteMovie,getMovieSearch,
    getMovieLike,createLikeMovie,deleteLikeMovie,
    getMovieType,getMovieNational
}