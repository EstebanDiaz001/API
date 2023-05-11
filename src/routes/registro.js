const express = require("express");
const { insertUser } = require("../../controllers/user.controller");
const router = express.Router();



// RUTAS DE LOS REGISTROS

////CREACION DE LOS REGISTROS EN LA BASE DE DATOS
//router.post('/registro', insertarRegstros);
//
//// USADO PARA INSERTAR POR MEDIO DE UN ENDPOINT UNA CATEGORIA NUEVA
//router.post(`/registroCategoria`, insertarCategorias)

router.put('/userRegister',insertUser);


module.exports = router;