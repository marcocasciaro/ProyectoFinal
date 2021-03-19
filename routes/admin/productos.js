const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = {dest: `./public/tmp` };
const upload = multer(config);
const model = require('../../models/productos');
const service = require('../../services/productos');


const all = async(req,res) => {
    var productos = await model.get();
    res.render('productos', {productos});
}

const create = async(req, res) => {
    const idFile = await service.createProducto(req.body, req.file);
    res.redirect('/admin/productos');
}


router.get('/', all);
router.get('/create', (req,res) => res.render("crearProducto"));
router.post('/create',upload.single("imagen"),create)



module.exports = router;