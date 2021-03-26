const {create, createImg} = require('./../models/productos');
const {imgFile} = require('./../utils/fileHandler');

const createProducto = async(body, file) => {
    try{
        const {insertId : idProducto} = await create(body);
        const uid = imgFile(file);
        console.log(uid)
        const obj = {idProducto, uid};
        const {insertId : idFile} = await createImg(obj);
        return idFile;
    }
    catch(e){
        console.error(e);
    }
}

module.exports = {createProducto};