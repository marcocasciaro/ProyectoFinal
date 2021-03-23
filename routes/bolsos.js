const express = require('express');
const router = express.Router();
const model = require('../models/bolsos');

const get = async(req,res) => {
    const productos = await model.get();
    res.render('bolsos', {productos});
}


router.get('/', get);


module.exports = router;