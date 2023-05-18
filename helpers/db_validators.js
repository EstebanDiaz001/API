const Rol = require("../database/schemas/rolSchema");
const User = require("../database/schemas/userSchema");




const esRolValido = async (rol = '') => {

    const existeRol = await Rol.findOne({ rol })
    if (!existeRol) throw new Error(`El Rol ${rol} no está registrado en la base de datos`)
}

const emailExiste = async (email = '') => {

    const userWithEmail = await User.findOne({ email });
    if (userWithEmail) throw new Error(`El correo electrónico ${email} ya está en uso`)
}


const existeUsuarioPorId = async (id) => {

    const userById = await User.findById({id});

    if (userById) throw new Error(`El id "${id}" no existe en la base de datos`)
}



module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}