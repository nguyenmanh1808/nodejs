
const { get } = require('../routes/web');
const userServices = require('../services/userServices');
const { getAPI, getPhim } = require('../routes/api')
const getHomepage = async (req, res) => {

    let results = await userServices.getALlUsers();
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
    let password = req.body.password;
    userServices.creNewUers(email,password,name)
    // connection.query(
    //     `select * from users`,
    //     function(err,results,fields){
    //         console.log(">>>result = ", results);
    //     }
    // )
    // const [result, fields] = await connection.query(`select * from users`);
    // console.log(">>>result = ", result);

   return  res.redirect("/admin/users")
}
////Thêm 
const createUser = (req, res) => {
    res.render('create_user.ejs');
}
/// sửa
const updateUser = async (req, res) => {
    let id = req.params.id;
    let user = await userServices.getUserByID(id);
    let usesrData = {};
        usesrData = user;
    return res.render('editUsers.ejs',{result : usesrData});
}

 const handleUpdateUser = async(req,res) =>{
    let email = req.body.email;
    let name = req.body.name;
    let password = req.body.password;
    let id =req.body.id
    console.log(req.body)
    await userServices.updateUserInfor( email,name,password,id);
    return  res.redirect("/admin/users");
 }
// xóa
 const HandleDeleteUser = async(req, res)=>{
    await userServices.deleteUser(req.params.id);
     return  res.redirect("/admin/users");
 }
///// MOVIE
const deatailMovie = async (req, res) => {
    const slug = req.params.slug.trim();
    let results = await getPhim(slug);
    return res.render('detailMovie.ejs', { phim: results });
}
const addMovies = async (req, res) => {
    const id = req.params.id.trim();
    let result = await getAPI(id);
    return res.render('moreMovies.ejs', { movies: result });
}

//////login-register
const login = (req, res) => {
    res.render('Login.ejs');
}
const register = (req, res) => {
    res.render('register.ejs');
}

module.exports = {
    getHomepage, getabc, postCreateUsers, createUser, updateUser, deatailMovie, addMovies, login, register,HandleDeleteUser,handleUpdateUser
}

