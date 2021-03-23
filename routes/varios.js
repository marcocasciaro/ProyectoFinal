const express = require('express');
const router = express.Router();
const model = require('../models/varios');

const get = async(req,res) => {
    const productos = await model.get();
    res.render('varios', {productos});
}


router.get('/', get);


module.exports = router;