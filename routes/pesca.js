const express = require('express');
const router = express.Router();
const model = require('../models/pesca');

const get = async(req,res) => {
    const productos = await model.get();
    res.render('pesca', {productos});
}


router.get('/', get);


module.exports = router;