const { check } = require("express-validator");
const { 
    namesExiste,
    emailExiste,
    existeUsuarioPorId,
    isStrongPassword} = require("../helpers/db_validators");




const insertUserChecks = [
    check('names', 'El nombre es obligatorio').not().isEmpty(),
    check('lastName', 'El apellido es obligatorio').not().isEmpty(),
    check('email', 'El correo no es un correo válido').isEmail(),
    check('phoneNumber', "El numero no es de colombia").isMobilePhone('es-CO'),
    check('password').custom(isStrongPassword),
    check('email').custom(emailExiste),
    //check('names').custom(namesExiste),
]

const updateUserCkecks = [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
]

const loginAuthChecks = [
    check('password').not().isEmpty(),
    check('email').isEmail(),
    check('email').not().custom(emailExiste),

]



module.exports = {
    insertUserChecks,
    updateUserCkecks,
    loginAuthChecks
}