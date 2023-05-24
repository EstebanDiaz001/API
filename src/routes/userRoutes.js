const express = require("express");
const router = express.Router();
const { 
    insertUser,
    getUser} = require("../../controllers/user.controller");
const {
    insertUserChecks,
    getUserCkecks} = require("../../middlewares/validar-campos");


const validarChecks = require("../../middlewares/validar-checks");



// RUTAS DE LOS USUARIOS
// REGISTRAR NUEVOS USUARIO
router.post('/userRegister', [insertUserChecks,validarChecks] ,insertUser);

// ACUALIZAR USUARIO
router.put('/userGet', [getUserCkecks,validarChecks],getUser);

module.exports = router;