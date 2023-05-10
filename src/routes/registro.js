const express = require("express");
const router = express.Router();
const { insertarRegstros, insertarCategorias } = require("../../controllers/registro.controller");
const esquemaCategoria = require("../../database/schema/esquemaCategoria");



// RUTAS DE LOS REGISTROS

//CREACION DE LOS REGISTROS EN LA BASE DE DATOS
router.post('/registro', insertarRegstros);

// USADO PARA INSERTAR POR MEDIO DE UN ENDPOINT UNA CATEGORIA NUEVA
router.post(`/registroCategoria`, insertarCategorias)



module.exports = router;