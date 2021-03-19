const express = require('express');
const router = express.Router();
const model = require('../models/contacto')
const sha1 = require('sha1');

const get = async(req,res) => {
    const usuarios = await model.get(true);
    res.render('contacto', {usuarios});
}


router.get('/', get);


module.exports = router;