const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = {dest: `./public/tmp` };
const upload = multer(config);
const model = require('./../models/productos');
const service = require('./../services/productos');


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

router.get('/', all);
router.get('/single/:id', single);


module.exports = router;