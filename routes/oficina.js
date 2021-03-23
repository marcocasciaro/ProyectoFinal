const express = require('express');
const router = express.Router();
const model = require('../models/oficina');

const get = async(req,res) => {
    const productos = await model.get();
    res.render('oficina', {productos});
}


router.get('/', get);


module.exports = router;