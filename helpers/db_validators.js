const Rol = require("../database/schemas/rolSchema");
const User = require("../database/schemas/userSchema");
const validator = require('validator');




// VALIDACIONES AL CREAR UN REGISTRO NUEVO
const esRolValido = async (rol) => {

    const existeRol = await Rol.findOne({ rol })
    if (!existeRol) throw new Error(`El Rol ${rol} no está registrado en la base de datos`)
}
const emailExiste = async (email) => {

    const userWithEmail = await User.findOne({ email });
    if (userWithEmail) throw new Error(`El correo electrónico ${email} ya está en uso`)
}

const isStrongPassword = async (password) => {
    
    const options = {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false
    };

    const strong = validator.isStrongPassword(password, options);
    if( !strong ) throw new Error('La contraseña no cumple los criterios de fortaleza.')
    



}
// VALIDACIONES AL ACTUALIZAR UN REGISTRO

const existeUsuarioPorId = async (id) => {

    const userById = await User.findById(id);

    if (!userById) throw new Error(`El id "${id}" no existe en la base de datos`)
}



module.exports = {
    esRolValido,
    emailExiste,
    isStrongPassword,
    existeUsuarioPorId,
}