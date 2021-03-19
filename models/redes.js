const pool = require("../utils/bd"); 
const TABLA_USUARIOS = "usuarios"

const get = async(habilitado) => {
    const query = "SELECT id, user, pass, admin FROM ?? WHERE habilitado = ?";
    const params = [TABLA_USUARIOS, habilitado];
    return await pool.query(query, params);
}




module.exports = {get};