const historyService = require('../services/historyService')

const readFunc = async (req,res)=>{
    try{
        let data =await historyService.getMovieHistory(req.query.data);
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
const createFunc = async (req,res)=>{
    try{
        console.log(req.body)
        let data =await historyService.createHistoryMovie(req.body);
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
module.exports={
    readFunc,createFunc
}