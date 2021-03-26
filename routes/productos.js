const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = {dest: `./public/tmp` };
const upload = multer(config);
const model = require('./../models/productos');
const service = require('./../services/productos');
const {add} = require('./../models/carrito');


const all = async(req,res) => {
    var productos = await model.get();
    res.render('productos', {productos});
}
const single = async(req,res) => {
    const id = req.params.id;
    console.log(id);
    var producto = await model.single(id);
    console.log(producto);
    res.render('producto', {producto});
}

const comprar = async(req, res) => {
    const id_usuario = req.session.idUser;
    const id = req.params.id;
    const producto = await model.single(id);
    //consulta sql devuelve SIEMPRE un array de objetos entonces para acceder a un objeto en concreto pongo en este caso producto[0].nombre(porque es un array de objetos)
    console.log(producto[0].nombre);
    const cantidad =  parseInt(req.body.cantidad);
    const obj = {
        id_usuario : id_usuario,
        nombre_producto : producto[0].nombre,
        precio : producto[0].precio * cantidad,
        cantidad : cantidad,
    }
    
    var agregar = await add(obj);
    console.log(agregar);
    res.redirect('/carrito');
}


router.get('/', all);
router.get('/single/:id', single);
router.post('/single/:id', comprar);



module.exports = router;