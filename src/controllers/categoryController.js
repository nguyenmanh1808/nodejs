const categoryService = require('../services/categoryService');

const readFunc = async(req,res)=>{
    try{
        if(req.query.movieid){
            let data = await categoryService.getCategoryByMovieId(req.query.movieid);
            return res.status(200).json({
                EM:data.EM,
                EC: data.EC,
                DT:data.DT
             })
        }
        else if(req.query.id){
            let data = await categoryService.getCategoryById(req.query.id);
            return res.status(200).json({
                EM:data.EM,
                EC: data.EC,
                DT:data.DT
             })
        }
        else{
            let data = await categoryService.getAllCategory();
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

const createFunc = async(req,res)=> {
    try{
        let data = await categoryService.createCategory(req.body.data);
        console.log(req.body.data)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
           })
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
const updateFunc = async (req,res)=>{
    try{
        let data = await categoryService.updateCategory(req.body);
        console.log(data)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
           })
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

const deleteFunc = async (req,res)=>{
    try{
        console.log(req.body)
      let data = await categoryService.deleteCategory(req.body.id)
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
module.exports = {readFunc,createFunc,updateFunc,deleteFunc}