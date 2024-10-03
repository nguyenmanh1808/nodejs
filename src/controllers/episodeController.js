const multer = require('multer');
const path = require('path');
var appRoot = require('app-root-path')
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
//upfile video
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,appRoot+ '/src/public/video');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|mp4)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
////

const createFunc = async (req,res)=>{
    
    try{
        let upload = multer({ storage: storage, fileFilter:imageFilter }).single('video');

    upload(req, res, async function(err) {
        if (req.fileValidationError) {
            return res.status(500).json({
                EM: `${req.fileValidationError}`,//eror mesage
                EC: '-1',//eror code
                DT:''//date
            })
        }
        let data = await episodeService.createEpi({...req.body,ep_url:req.file.filename});
            console.log(data)
            return res.status(200).json({
                EM:data.EM,
                EC: data.EC,
                DT:data.DT
             })
    });     
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

const updateFunc = async(req,res)=>{
    try{
        if(req.body){
            let data = await episodeService.updateEpi(req.body);
            console.log(data)
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

const deleteFunc = async(req,res)=>{
    try{
        console.log(req.body)
      let data = await episodeService.deleteEpi(req.body.id)
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