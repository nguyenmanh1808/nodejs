const moviesSevice = require('../services/moviesService')

const readFunc = async (req,res)=>{
    try{
        if(req.query.category){
            let data = await moviesSevice.getMoviesCategory(req.query.category);
            return res.status(200).json({
                EM:data.EM,
                EC: data.EC,
                DT:data.DT
             })
        }
        else if(req.query.id){
            let data = await moviesSevice.getMoviesById(+req.query.id);
            console.log(req.query.id)
            return res.status(200).json({
                EM:data.EM,
                EC: data.EC,
                DT:data.DT
             })
        }
        else if(req.query.page && req.query.limit){
            let page = req.query.page ;
            let limit = req.query.limit;
            console.log("page:" ,page,"limit :",limit)
            let data = await moviesSevice.getMoviesPagnination(+page,+limit);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }
        else {
            let data = await moviesSevice.getMovies();
                return res.status(200).json({
                    EM: data.EM,
                    EC: data.EC,
                    DT: data.DT
                })
        }
    }
    catch(e){
        console.log(e)
        return res.status(500).json({
            EM: 'eror',//eror mesage
            EC: '-1',//eror code
            DT:''//date
        })
    }
}

const createFunc = async (req,res)=>{
   try{
        let data = await moviesSevice.createNewMovie(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
           })
   }
   catch(e){
    console.log(e);
        return res.status(500).json({
            EM: 'eror',//eror mesage
            EC: '-1',//eror code
            DT:''//date
        })
   }
}

const updateFunc = async(req,res)=>{
    try{
        let data = await moviesSevice.updateMovie(req.body);
        console.log(data)
         return res.status(200).json({
           EM: data.EM,
           EC: data.EC,
           DT: data.DT
         })
     }
     catch(e){
         console.log(e);
         return res.status(500).json({
             EM: 'eror',//eror mesage
             EC: '-1',//eror code
             DT:''//date
         })
     }
}

const deleteFunc = async(req,res)=>{
    try{
        console.log(req.body)
      let data = await moviesSevice.deleteMovie(req.body.id)
      console.log(data)
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT
    })
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            EM: 'eror',//eror mesage
            EC: '-1',//eror code
            DT:''//date
        })
    }
}
module.exports = {
    readFunc,createFunc,updateFunc,deleteFunc
}