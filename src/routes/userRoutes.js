const express = require("express");
const router = express.Router();
const { 
    insertUser,
    getUser,
    updateUser} = require("../../controllers/user.controller");
const {
    insertUserChecks,
    getUserChecks,
    updateUserChecks} = require("../../middlewares/validar-campos");


const validarChecks = require("../../middlewares/validar-checks");



// ??RUTAS DE LOS USUARIOS
// *REGISTRAR NUEVOS USUARIO
router.post('/userRegister',    [insertUserChecks,validarChecks], insertUser);
// *OBTENER USUARIO
router.get('/userGet',          [getUserChecks,validarChecks],getUser);
// *ACTUALIZAR USUARIO
router.put('/userUpdate',       [updateUserChecks, validarChecks],updateUser);

module.exports = router;