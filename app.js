var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var dotenv = require('dotenv');
const {verifyAdmin, verifyUser} = require('./midlewares/auth');
const { verifyLogin } = require('./midlewares/users');
dotenv.config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usuariosRouter = require('./routes/admin/usuarios');
var loginRouter = require('./routes/login');
var registroRouter = require('./routes/registro');
var contactoRouter = require('./routes/contacto');
var redesRouter = require('./routes/redes');
var adminproductosRouter = require('./routes/admin/productos');
var adminproductos2Router = require('./routes/admin/productos2');
var variosRouter = require('./routes/varios');
var pescaRouter = require('./routes/pesca');
var bolsosRouter = require('./routes/bolsos');
var gourmetRouter = require('./routes/gourmet');
var outdoorRouter = require('./routes/outdoor');
var oficinaRouter = require('./routes/oficina');
var productosRouter = require('./routes/productos');
var carritoRouter = require('./routes/carrito');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'pass secreto',
  cookie : {maxAge : null},
  resave: true,
  saveUninitialized: false
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/usuarios', verifyAdmin, usuariosRouter);
app.use('/login', loginRouter);
app.use('/registro', registroRouter);
app.use('/contacto', contactoRouter);
app.use('/redes', redesRouter);
app.use('/admin/productos', verifyAdmin, adminproductosRouter);
app.use('/admin/productos2', verifyAdmin, adminproductos2Router);
app.use('/varios', variosRouter);
app.use('/pesca', pescaRouter);
app.use('/bolsos', bolsosRouter);
app.use('/gourmet', gourmetRouter);
app.use('/outdoor', outdoorRouter);
app.use('/oficina', oficinaRouter);
app.use('/productos', productosRouter);
app.use('/carrito', verifyUser, carritoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
