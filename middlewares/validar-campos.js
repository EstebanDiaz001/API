const {validationResult} = require('express-validator')
const { check } = require("express-validator");
const { 
    emailExiste, 
    isStrongPassword} = require("../helpers/db_validators");




const insertUserChecks = [
    check('names', 'El nombre es obligatorio').not().isEmpty(),
    check('lastName', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es un correo válido').isEmail(),
    check('phoneNumber').isMobilePhone('es-CO'),
    check('password').custom(isStrongPassword),
    check('email').custom(emailExiste),
]
const validarErrores = (req , res , next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }
    next();
}

module.exports = {
    validarErrores,
    insertUserChecks
}