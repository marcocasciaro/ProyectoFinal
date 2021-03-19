const express = require('express');
const router = express.Router();
const model = require('../models/redes')
const sha1 = require('sha1');

const get = async(req,res) => {
    const usuarios = await model.get(true);
    res.render('redes', {usuarios});
}


router.get('/', get);


module.exports = router;