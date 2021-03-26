const pool = require('./../utils/bd');
const TABLA_PRODUCTOS = "productos";
const T_PRODUCTOS_IMAGENES = "productos_imagenes";


const get = async (habilitado) => {
    const query = "SELECT p.*, p_i.uid  FROM ?? AS p JOIN ?? AS p_i ON p.id = p_i.idProducto WHERE p.habilitado = 1";
    const params = [TABLA_PRODUCTOS, T_PRODUCTOS_IMAGENES, habilitado];
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
    const query = "INSERT INTO ?? SET ?";
    const params = [T_PRODUCTOS_IMAGENES, obj];
    const rows = await pool.query(query,params);
    return rows;
}

module.exports = {get, single, create, createImg}