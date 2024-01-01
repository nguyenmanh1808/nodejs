const connection = require('../config/DB');

const getALlUsers = async () => {
    let [results, fields] = await connection.query('select * from users');
    return results;
}

module.exports = {
    getALlUsers
}
