const connection = require('../config/DB');
const { getALlUsers } = require('../services/CRUD')
const getHomepage = async (req, res) => {

    let results = await getALlUsers();

    return res.render('Home.ejs', { ListUsers: results });
}

const getabc = (req, res) => {
    res.render('xameple.ejs');
}

const postCreateUsers = async (req, res) => {
    console.log(req.body)
    let email = req.body.email;
    let name = req.body.Name;
    let city = req.body.City;

    let [results, fields] = await connection.query(`insert into users(email,name,city) values (?,?,?);`, [email, name, city]);

    ///////////////////////////////////////

    // connection.query(
    //     `select * from users`,
    //     function(err,results,fields){
    //         console.log(">>>result = ", results);
    //     }
    // )
    // const [result, fields] = await connection.query(`select * from users`);
    // console.log(">>>result = ", result);
    res.send("create ueser successed")
}

const createUser = (req, res) => {
    res.render('create_user.ejs');
}
module.exports = {
    getHomepage, getabc, postCreateUsers, createUser
}