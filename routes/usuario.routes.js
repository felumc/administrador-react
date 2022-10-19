module.exports = app => {
  const usuario = require("../controllers/usuario.controller.js");
  var router = require("express").Router();
  const express = require("express");
  const rutasProtegidas = express.Router();
  const config = require("../config/config");
  const jwt = require('jsonwebtoken');

  app.set("llave", config.llave);

  rutasProtegidas.use((req, res, next) => {
    const token = req.headers["access-token"];
    if (token) {
      jwt.verify(token, app.get("llave"), (err, decoded) => {
        if (err) {
          return res.status(500).send("token error");
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(500).send("token error");
    }
  });
  router.post("/usuario/crear", rutasProtegidas, usuario.create);
  //http://localhost:9595/administrador/usuario/crear

  router.get("/usuario/listar", rutasProtegidas, usuario.findAll);
  //http://localhost:9595/administrador/usuario/listar

  router.get('usuario/id', rutasProtegidas, usuario.findOne); //http://localhost:9595/administrador/usuario/1

  router.put('usuario/id', rutasProtegidas, usuario.update); //http://localhost:9595/administrador/usuario/1

  router.delete('/usuario/id', rutasProtegidas, usuario.delete); //http://localhost:9595/administrador/usuario/1

  router.delete("/usuario/eliminar", rutasProtegidas, usuario.deleteAll);

  router.post("/login", usuario.login); //http://localhost:9595/administrador/login

  router.post("/registrar", usuario.create); //http://localhost:9595/administrador/login

  app.use('/administrador', router);
}
