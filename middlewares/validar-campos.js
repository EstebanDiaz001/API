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
    check('DNI', 'Solo se aceptan Strings').isString(),
    check('DNI').custom(existeDNI),
    check('password').custom(isStrongPassword),
    check('email').custom(emailExiste),
    check('phoneNumber').custom(numeroDeTelefonoExiste),
    // check('DNI').custom(isCoDNI),
    //check('names').custom(namesExiste) // VALIDACIÓN QUE SE GANÓ EL ODIO
]

const getUserChecks = [
    // check('id', 'No es un id valido').isMongoId(),   DEPRECADAS DE MOMENTO
    // check('user').custom(existeUsuarioPorId),        DEPRECADAS DE MOMENTO
    validarJWT,
    check('email', 'El correo no es un correo válido').isEmail(),
    check('email').custom(emailNoExiste),
    check('password', 'La contraseña es obligatoria').notEmpty(),
]

const updateUserChecks = [

    validarJWT,
    check('names','El campo names es requerido').notEmpty(),
    check('lastName','El campo lastName es requerido').notEmpty(),
    check('email','El campo email es requerido').notEmpty(),
    check('email', 'El correo no es un correo válido').isEmail(),
    check('oldPassword','El campo oldPassword es requerido').notEmpty(),
    check('newPassword','El campo newPassword es requerido').notEmpty(),
    check('confirmNewPassword','El campo confirmNewPassword es requerido').notEmpty(),
    check('phoneNumber','El campo phoneNumber es requerido').notEmpty(),
    check('typeDNI','El campo typeDNI es requerido').notEmpty(),
    check('typeDNI').custom(typeDNI),
    check('DNI','El campo DNI es requerido').notEmpty(),
    check('DNI', 'Solo se aceptan Strings').isString(),


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
    getUserChecks,
    loginAuthChecks,
    googleChecks,
    updateUserChecks
}