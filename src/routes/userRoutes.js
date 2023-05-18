const express = require("express");
const { check } = require("express-validator");
const { 
    insertUser,
    updateUser } = require("../../controllers/user.controller");
const { insertUserChecks, validarErrores } = require("../../middlewares/validar-campos");
const { 
    esRolValido,
    emailExiste, 
    existeUsuarioPorId} = require("../../helpers/db_validators");
const router = express.Router();



// RUTAS DE LOS USUARIOS
// REGISTRAR NUEVOS USUARIO
router.post('/userRegister', [insertUserChecks,validarErrores] ,insertUser);
// ACUALIZAR USUARIO
router.put('/userUpdate/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),

    validarErrores
    // check('id').custom(existeUsuarioPorId),
    // check('rol').custom(esRolValido),
],updateUser);

module.exports = router;