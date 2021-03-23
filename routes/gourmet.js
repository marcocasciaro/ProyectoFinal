const express = require('express');
const router = express.Router();
const model = require('../models/gourmet');

const get = async(req,res) => {
    const productos = await model.get();
    res.render('gourmet', {productos});
}


router.get('/', get);


module.exports = router;