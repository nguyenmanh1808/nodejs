const connection = require('../config/DB');
const { get } = require('../routes/web');
const { getALlUsers, getAPI, getPhim } = require('../services/CRUD')
const getHomepage = async (req, res) => {

    let results = await getALlUsers();

    return res.render('ListUsers.ejs', { ListUsers: results });
}

const getabc = async (req, res) => {
    let result = await getAPI(1);
    return res.render('HomePage.ejs', { movies: result });
}

const postCreateUsers = async (req, res) => {
    console.log(req.body)
    let email = req.body.email;
    let name = req.body.Name;
    let city = req.body.City;

    let [results, fields] = await connection.query(`insert into users(email,name,city) values (?,?,?);`, [email, name, city]);


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
const updateUser = (req, res) => {
    res.render('editUsers.ejs');
}
const deatailMovie = async (req, res) => {
    const slug = req.params.slug.trim();
    let results = await getPhim(slug);
    return res.render('phim.ejs', { phim: results });
}
const addMovies = async (req, res) => {
    const id = req.params.id.trim();
    let result = await getAPI(id);
    return res.render('addMovies.ejs', { movies: result });
}

const login = (req, res) => {
    res.render('Login.ejs');
}
const register = (req, res) => {
    res.render('register.ejs');
}
module.exports = {
    getHomepage, getabc, postCreateUsers, createUser, updateUser, deatailMovie, addMovies, login, register
}

