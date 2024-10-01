
const episodeService = require('../services/episodeService')

const readFunc = async(req,res)=>{
    try{
        if(req.query.id){
            let data = await episodeService.getbyMovieId(req.query.id);
            return res.status(200).json({
                EM:data.EM,
                EC: data.EC,
                DT:data.DT
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

module.exports = {readFunc}