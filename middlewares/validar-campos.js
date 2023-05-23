const { check } = require("express-validator");
const { 
    emailExiste,
    isStrongPassword,
    emailNoExiste,
    numeroDeTelefonoExiste,
    isCoDNI,
    typeDNI,
    existeDNI} = require("../helpers/db_validators");
const validarJWT = require("./validar_jwt");




const insertUserChecks = [
    check('names', 'El nombre es obligatorio').notEmpty(),
    check('lastName', 'El apellido es obligatorio').notEmpty(),
    check('email', 'El correo no es un correo válido').isEmail(),
    check('phoneNumber', "El numero no es de colombia").isMobilePhone('es-CO'),
    check('typeDNI').custom(typeDNI),
    check('DNI').custom(existeDNI),
    check('password').custom(isStrongPassword),
    check('email').custom(emailExiste),
    check('phoneNumber').custom(numeroDeTelefonoExiste),
    // check('DNI').custom(isCoDNI),
    //check('names').custom(namesExiste) // VALIDACIÓN QUE SE GANÓ EL ODIO
]

const updateUserCkecks = [
    // check('id', 'No es un id valido').isMongoId(),   DEPRECADAS DE MOMENTO
    // check('user').custom(existeUsuarioPorId),        DEPRECADAS DE MOMENTO
    validarJWT,
]

const loginAuthChecks = [
    check('password', 'La contraseña es obligatoria').notEmpty(),
    check('email', 'El correo no es un correo válido').isEmail(),
    check('email').custom(emailNoExiste),

]

const googleChecks = [
    check('id_token', 'El token es obligatorio').notEmpty(),
]

module.exports = {
    insertUserChecks,
    updateUserCkecks,
    loginAuthChecks,
    googleChecks
}