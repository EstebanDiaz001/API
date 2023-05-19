const express = require("express");
const { check } = require("express-validator");
const { 
    insertUser,
    updateUser } = require("../../controllers/user.controller");
const { insertUserChecks, updateUserCkecks } = require("../../middlewares/validar-campos");

const { 
    esRolValido,
    emailExiste, 
    existeUsuarioPorId} = require("../../helpers/db_validators");
const validarChecks = require("../../middlewares/validar-checks");
const router = express.Router();



// RUTAS DE LOS USUARIOS
// REGISTRAR NUEVOS USUARIO
router.post('/userRegister', [insertUserChecks,validarChecks] ,insertUser);
// ACUALIZAR USUARIO
router.put('/userUpdate', [updateUserCkecks,validarChecks],updateUser);

module.exports = router;