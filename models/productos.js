const pool = require('./../utils/bd');
const TABLA_PRODUCTOS = "productos";
const T_PRODUCTOS_IMAGENES = "productos_imagenes";

const get = async () => {
    const query = "SELECT p.*, p_i.uid FROM ?? AS p JOIN ?? AS p_i ON p.id = p_i.idProducto";
    const params = [TABLA_PRODUCTOS, T_PRODUCTOS_IMAGENES];
    const rows = await pool.query(query, params);
    return rows;
}

const create = async(obj) => {
    const query = "INSERT INTO ?? SET ?";
    const params = [TABLA_PRODUCTOS, obj]
    const rows = await pool.query(query, params);
    return rows;

}

const single = async(id) => {
    const query = "SELECT p.*, p_i.uid FROM ?? AS p JOIN ?? AS p_i ON p.id = p_i.idProducto WHERE p.id = ?";
    const params = [TABLA_PRODUCTOS, T_PRODUCTOS_IMAGENES, id];
    const rows = await pool.query(query, params);
    return rows;
}

const createImg = async(obj) => {
    pool.query("INSERT INTO ?? SET ?", [T_PRODUCTOS_IMAGENES, obj]).then((response) => response).catch((e) => console.log(e));

}


module.exports = {get, single, create, createImg}