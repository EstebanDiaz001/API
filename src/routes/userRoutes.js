const express = require("express");
const { check } = require("express-validator");
const { 
    insertUser,
    updateUserPassword } = require("../../controllers/user.controller");
const { validarCampos } = require("../../middlewares/validar-campos");
const { 
    esRolValido,
    emailExiste, 
    existeUsuarioPorId} = require("../../helpers/db_validators");
const router = express.Router();



// RUTAS DE LOS USUARIOS
// REGISTRAR NUEVOS USUARIO
router.post('/userRegister', [
    // check('rol', 'El rol no es válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('names', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es un correo válido').isEmail(),
    check('password', 'La contraseña debe ser de más de 6 caractéres').isLength({min:6}),
    check('email').custom(emailExiste),
    check('phoneNumber').isMobilePhone('es-CO'),
    validarCampos
] ,insertUser);
// ACUALIZAR CONTRASEÑAS
router.put('/userUpdate',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
],updateUserPassword);

module.exports = router;