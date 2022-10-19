const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const express = require("express");
const path = require("path");
const moment = require("moment");
const { usuario } = require("../models");

const Usuario = db.usuario;
const app = express();
app.set("llave", config.llave);

//Crear y guardar un nuevo usuario
exports.create = (req, res) => {
    Usuario.findOne({ where: { correo: req.body.correo } })
        .then(usuario => {
            //Validar request
            if (usuario) {
                res.status(400).send({
                    mensaje: "Correo existente"
                });
                return
            }
            else {
                //Crear un usuario
                const passwordHash = bcrypt.hashSync(req.body.contrasenia, 10);

                const usuario = {
                    correo: req.body.correo,
                    contrasenia: passwordHash,
                    estatus: req.body.estatus,
                    fechaRegistro: req.body.fechaRegistro,
                    fechaVigencia: req.body.fechaVigencia,
                    rol_id: req.body.rol_id
                };

                //Guardar usuario en la base de datos
                Usuario.create(usuario)
                    .then(usuario => {
                        res.status(200).send(usuario);
                    })
                    .catch(err => {
                        //res.status(500).send({
                        //    mensaje:
                        //    err.menssage || "Ocurrio un error al crear Rol."
                        //});
                        res.status(500).sendFile(path.join(_dirname, "../source/img", "error.png"));
                    });
            }
        })
        .catch(err => {
            //res.status(500).send({
            //mensaje:
            //  err.message || "Ocurrio un error al crear Rol."
            //});
            res.status(500).sendFile(path.join(_dirname,'../source/img', 'error.png'));
        });
};

//Recuperar todos los usuarios de la base de datos
exports.findAll = (req, res) => {
    Usuario.findAll({
        include:[
            {
                model:db.rol,
            }],
    })
    .then(usuario => {
        res.status(200).send(usuario);
    })
    .catch(err => {
        res.status(500).send({
            mensaje:
                err.message || "Ocurrio un error al recuperar todos los Usuarios."
        });
    });
};

//Buscar Usuario por Id
