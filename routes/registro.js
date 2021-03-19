var express = require('express');
var router = express.Router();
const model = require('./../models/usuarios');
const sha1 = require('sha1');
const {v4 : uuid} = require('uuid');
const {send} = require('./../services/mail')

const create = async(req,res) => {
    req.body.pass = sha1(req.body.pass);
    const obj = {
        user : req.body.user,
        pass : req.body.pass,
        mail : req.body.mail,
        confirmacionCorreo : uuid(),
    }
    console.log(obj)
    var newUser = await model.create(obj);
    const mailinfo = {
        mail : obj.mail,
        message : `
        <h2>Gracias por registrarte ${obj.user}</h2>
        <h3>No olvides verificar tu cuenta para seguir </h3>
        <a href=${process.env.URL_SERVER}:${process.env.PORT}/registro/verify?uid=${obj.confirmacionCorreo}>Verificacion de correo </a>
      `
    }
    console.log(mailinfo)
    const mail = await send(obj);
    res.render('registro', {message: "Usuario creado! Se envio un mail de confirmacion a tu casilla!"});
}
const verifyEmail = async (req, res) => {
    try {
      const { uid } = req.query;
      await model.update({ data: { habilitado: 1 }, uid });
      res.redirect("/login");
    } catch (e) {
      console.error(e);
    }
  };

router.get('/', (req, res) => res.render('registro'))
router.post('/', create);
router.get('/verify', verifyEmail);

module.exports = router;