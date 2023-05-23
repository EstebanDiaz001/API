const express = require("express");
const { 
    insertUser,
    updateUser} = require("../../controllers/user.controller");
const {
    insertUserChecks,
    updateUserCkecks} = require("../../middlewares/validar-campos");


const validarChecks = require("../../middlewares/validar-checks");
const router = express.Router();



// RUTAS DE LOS USUARIOS
// REGISTRAR NUEVOS USUARIO
router.post('/userRegister', [insertUserChecks,validarChecks] ,insertUser);

// ACUALIZAR USUARIO
router.put('/userUpdate', [updateUserCkecks,validarChecks],updateUser);

module.exports = router;