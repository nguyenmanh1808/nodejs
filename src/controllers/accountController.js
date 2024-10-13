const req = require('express/lib/request');
const accountService = require('../services/accountService');

const readFunc = async(req,res)=>{  
    try{
        let data = await accountService.getAccount(req.query.data)
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
        let data = await accountService.updaetPassword(req.body)
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
module.exports ={
    readFunc,updateFunc
}