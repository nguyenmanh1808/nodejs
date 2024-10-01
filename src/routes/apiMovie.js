
const fetch = require("node-fetch");


const getAPI = async (page) => {
    let response = await fetch(`https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${page}`);
    let data = await response.json();
    return data;
}

const getPhim = async (slug) => {
    let a = `https://ophim1.com/phim/${slug}`;
    let response = await fetch(a);
    let data = await response.json();
    return data;
}
module.exports = {
     getAPI, getPhim
}