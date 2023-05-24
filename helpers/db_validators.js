const Rol = require("../database/schemas/rolSchema");
const User = require("../database/schemas/userSchema");
const validator = require('validator');




// VALIDACIONES AL CREAR UN REGISTRO NUEVO
const esRolValido = async (rol) => {

    const existeRol = await Rol.findOne({ rol })
    if (!existeRol) throw new Error(`El Rol ${rol} no es un rol válido`)
}
const emailExiste = async (email) => {

    const userWithEmail = await User.findOne({ email });
    if (userWithEmail) throw new Error(`El correo electrónico ${email} ya está en uso`)
}

const emailNoExiste = async (email) => {

    const userWithEmail = await User.findOne({ email });
    if (!userWithEmail) throw new Error(`El correo electrónico ${email} no está registrado en la base de datos`)
}
const namesExiste = async (names) => {

    const userWithNames = await User.findOne({names})
    if (userWithNames) throw new Error(`El nombre ${names} ya existe en la base de datos`)

}
const numeroDeTelefonoExiste = async (phoneNumber) => {

    const userWithPhone = await User.findOne({phoneNumber})
    if (userWithPhone) throw new Error(`El numero ${phoneNumber} ya existe en la base de datos`)

}
const isStrongPassword = async (password) => {
    
    const options = {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    };

    const a = JSON.stringify(options)

    const strong = validator.isStrongPassword(password, options);
    if( !strong ) throw new Error(`La contraseña no cumple los criterios de fortaleza ( Míninmo 8 caracteres, Una Mayúscula, Una Minúscula, Un Número, Un Símbolo  ).`
    )
    



}

const isCoDNI = async (DNI) => {
    const cedulaSinPuntos = DNI.replace(/\./g, '');

    if (!/^\d{10}$/.test(cedulaSinPuntos)) {
      throw new Error('La cédula debe contener 10 dígitos');
    }
}

const typeDNI = async (type) => {

    const options = ['CC','PASAPORTE']
       if (!options.includes(type)) {
        throw new Error('No es un tipo de documento valido')
       }
}

const existeDNI = async (DNI) =>{
    
    const userByDNI = await User.findOne({DNI})
    if (userByDNI) throw new Error('Ya existe un usuario con este DNI')
}

// VALIDACIONES AL ACTUALIZAR UN REGISTRO

const existeUsuarioPorId = async (user) => {

    const id = user._id
    console.log(user);

    const userById = await User.findById(id);

    if (!userById) throw new Error(`El id "${id}" no existe en la base de datos`)
}



module.exports = {
    esRolValido,
    emailExiste,
    emailNoExiste,
    isStrongPassword,
    existeUsuarioPorId,
    namesExiste,
    numeroDeTelefonoExiste,
    isCoDNI,
    typeDNI,
    existeDNI
}