const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = {dest: `./public/tmp` };
const upload = multer(config);
const model = require('../../models/productos2');
const {get} = require('../../models/productos2');


const all = async(req,res) => {
    var status = true;
    var productos = await model.get(status);
    res.render('listaproductos', {productos, status});
}

const allFalse = async(req,res) => {
    var status = false;
    var productos = await model.get(status);
    res.render('listaproductos', {productos, status});
}
const single = async(req,res) => {
    const id = req.params.id;
    const producto = await model.single(id);
    res.render('listaproducto', {producto});
}


const getUpdate = async(req,res) => {
    const id = req.params.id;
    const producto = await model.single(id);
    const nombre = producto[0].nombre;
    const descripcion = producto[0].descripcion;
    const precio = producto[0].precio;
    const tipo = producto[0].tipo;
    res.render('modificarProducto', {nombre, descripcion, precio, tipo});
}
const update = async(req,res) => {
    const id = req.params.id;
    const proModif = req.body;
    console.log(proModif);
    res.redirect('/admin/productos2');
}

const borrar = async(req,res) => {
    const status = false;
    const id = req.params.id;
    const borrado = await model.borrar(id, status);
    res.redirect('/admin/productos2');
}

const habilitar = async(req,res) => {
    const status = true;
    const id = req.params.id;
    const borrado = await model.borrar(id, status);
    res.redirect('/admin/productos2');
}


router.get('/', all);
router.get('/single/:id', single);
router.get('/update/:id', getUpdate);
router.post('/update/:id', update);
router.get('/delete/:id', borrar);
router.get('/disabled', allFalse);
router.get('/disabled/:id', habilitar);


module.exports = router;