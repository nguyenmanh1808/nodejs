const db = require('../models/index')

const getGroups = async()=>{
    try{
        let data = await db.Group.findAll({
            order: [
                ['name','ASC']
            ]
        });
        return {
            EM:"Get group success ",
            EC:0,
            DT: data
        }
    }
    catch(e){
        return res.status(500).json({
            EM: 'eror',//eror mesage
            EC: '-1',//eror code
            DT:''//date
        })
    }
}

module.exports = {
    getGroups
}