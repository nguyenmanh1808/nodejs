const handleUser = require('../services/handleUser');

const testApi = (req,res) => {
    return res.status(200).json({
        message:"ok",
        data: "test api"
    })
 }
const handleRegister = async (req,res)=>{
    try{
         //checkpassword
         if(req.body.password  && req.body.password.length < 6 ){
            return res.status(200).json({
                EM:"Mật khẩu phải lớn hơn hoặc bằng 6 ký tự",
                EC: '1',
                DT:''
            })
        }
        //service: create user
        let data = await handleUser.registerUser(req.body)
        return res.status(200).json({
            EM:data.EM,
            EC: data.EC,
            DT:''
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


const handleLogin = async (req,res) =>{
    try{
      let data = await  handleUser.handleUserLogin(req.body);
      //set cookies
      if(data.EC=== 0){
        res.cookie("jwt",data.DT.access_token,{httpOnly:true, maxAge:60*60*100});
      }
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT:data.DT
        })
    }
    catch(e){
        console.log(e);
        console.log(req.body)
        return res.status(500).json({
            EM: 'eror',//eror mesage
            EC: '-1',//eror code
            DT:''//date
        })
    }
    

   
}


const handleLogout =async (req,res)=>{
    try{
            res.clearCookie("jwt");
          return res.status(200).json({
              EM: "ok",
              EC: 0,
              DT:""
          })
      }
      catch(e){
         
          return res.status(500).json({
              EM: 'eror',//eror mesage
              EC: '-1',//eror code
              DT:''//date
          })
      }
}
module.exports = {testApi,handleRegister,handleLogin,handleLogout};