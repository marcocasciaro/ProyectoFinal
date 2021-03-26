var express = require('express');
var router = express.Router();
const model = require('./../models/productos');

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


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
