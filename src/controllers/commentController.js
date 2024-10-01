const commentService = require('../services/commentService')
const readFunc = async (req,res)=>{
    try{
       
            if(req.query.page && req.query.limit){
                let page = req.query.page ;
                let limit = req.query.limit;
                console.log("page:" ,page,"limit :",limit)
                let data = await commentService.getCommentPatination(+page,+limit);
                return res.status(200).json({
                    EM: data.EM,
                    EC: data.EC,
                    DT: data.DT
                })
            }
            else if(req.query.movieId){
                let data = await commentService.getCommentByMovieId(req.query.movieId);
                return res.status(200).json({
                    EM: data.EM,
                    EC: data.EC,
                    DT: data.DT
                })
            }
            else{
                let data = await commentService.getComment();
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
const deleteFunc = async(req,res)=>{
    try{
        console.log(req.body)
      let data = await commentService.deleteComment(req.body.id)
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
const createFunc = async(req,res)=>{
    
    try{
        console.log(req.body)
        let data =await commentService.createComment(req.body);
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
    readFunc,deleteFunc,createFunc
}