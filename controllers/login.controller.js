require("dotenv").config();
const bcrypt = require('bcryptjs');
const { response, request } = require("express");
const generarJWT = require("../helpers/generar_jwt");
const User = require("../database/schemas/userSchema");


// AUTENTICACIÓN DE LAS CREDENCIALES
const loginAuth = async (req = request, res = response) => {

    const {password, email } = req.body

    const user = await User.findOne({email})

    try {
        const equal = bcrypt.compareSync(password, user.password)
        if (!equal) return res.status(400).json({msg:'La contraseña es incorrecta', success:false})
        const token = await generarJWT(user.id)
        console.log('asd');
        
        res.status(200).json({success:true, user, token})
    } catch (error) {
        res.status(500).json({error:'Algo salió mal'})
    }

}




// SE ECPORTAN LAS FUNCIONES
module.exports = {
    loginAuth,
}