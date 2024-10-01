const apiUserService = require('../services/apiUserService');



const readFunc =async (req,res)=>{
        
        try{
            if(req.query.page && req.query.limit){
                let page = req.query.page ;
                let limit = req.query.limit;
                console.log("page:" ,page,"limit :",limit)
                let data = await apiUserService.getUserPatination(+page,+limit);
                return res.status(200).json({
                    EM: data.EM,
                    EC: data.EC,
                    DT: data.DT
                })
            }
            else{
                let data = await apiUserService.getAllUser();
                return res.status(200).json({
                    EM: data.EM,
                    EC: data.EC,
                    DT: data.DT
            })
            }
            
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
        //checkpassword
        if(req.body.password  && req.body.password.length < 6 ){
            return res.status(200).json({
                EM:"Mật khẩu phải lớn hơn hoặc bằng 6 ký tự",
                EC: '1',
                DT:''
            })
        }
        let data = await apiUserService.createNewUser(req.body)
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

const updateFunc = async (req,res)=>{
    try{
       let data = await apiUserService.updateUser(req.body);
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

const deleteFunc = async (req,res)=>{
    try{
        console.log(req.body)
      let data = await apiUserService.deleteUser(req.body.id)
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
    readFunc, createFunc,updateFunc,deleteFunc 
}