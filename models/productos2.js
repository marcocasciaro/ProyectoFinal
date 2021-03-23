const pool = require("./../utils/bd"); // referencia de la conexion
const TABLA_PRODUCTOS = "productos";


//select a la BD

const get = async (habilitado) => {
    const query = "SELECT p.id, p.nombre, p.descripcion, p.precio, p.tipo  FROM ?? as p  WHERE p.habilitado = ?";
    const params = [TABLA_PRODUCTOS, habilitado];
    // la query me devuelve un objeto o conjunto de filas Data Row Package en un [{}]
    const rows = await pool.query(query, params);
    return rows;
}
const single = async (id) =>{
    const query = `SELECT p.* FROM ?? as p  WHERE P.id = ? AND p.habilitado = true`;
    const params = [TABLA_PRODUCTOS, id];
    const rows = await pool.query(query, params);
    console.log(rows);
    return rows;
}



const update = async(id, obj) => {
    const query = `UPDATE ?? AS p SET ? WHERE p.id = ?`;
    const params = [TABLA_PRODUCTOS, obj, id];
    const rows = await pool.query(query,params);
    return rows;
}


const borrar = async(id, habilitado) => {
    const query = `UPDATE ?? AS p SET habilitado = ? WHERE p.id = ?`;
    const params = [TABLA_PRODUCTOS, habilitado, id];
    return await pool.query(query, params);
}


module.exports = {get, single,  update, borrar};