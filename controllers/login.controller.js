require("dotenv").config();
const bcrypt = require('bcryptjs');
const { response, request, json } = require("express");
const generarJWT = require("../helpers/generar_jwt");
const User = require("../database/schemas/userSchema");
const { googleVerify } = require("../helpers/google-verify");


// AUTENTICACIÓN DE LAS CREDENCIALES
const loginAuth = async (req = request, res = response) => {

    const {password, email } = req.body

    try {
        const user = await User.findOne({email})
    
        const equal = bcrypt.compareSync(password, user.password)
        if (!equal) return res.status(400).json({msg:'La contraseña es incorrecta', success:false})
        const token = await generarJWT(user.id)
        console.log('asd');
        
        res.status(200).json({
            success:true,
            msg:'Te has logueado correctamente',
            user,
            token
        })
    } catch (error) {
        res.status(500).json({error:'Algo salió mal'})
    }

}

const googleSigin = async (req = request, res = response) =>{
    
    const {id_token} = req.body;
    try {
        
        const {names, lastName, img, email} = await googleVerify(id_token);
        console.log({id_token});
        let usuario = await User.findOneAndUpdate({email}, {google:true})
        if (!usuario) {
            const data = {
                names,
                lastName,
                email, 
                img, 
                password:'admin',
                phoneNumber:'3000000000',
                DNI:'1001000000',
                typeDNI:'CC',
                google:true
            };
            usuario = new User(data);
            
            await usuario.save();
        }

        const token = await generarJWT(usuario.id)
        usuario = await User.findOne({email})
        
        return res.json({
            usuario,
            msg:'Te has logueado correctamente',
            token
        })


    } catch (error) {
        console.log("error", error);
        return res.status(400).json({
            success:false,
            msg:`Token invalido`,
        })
    }
  
  }


// SE ECPORTAN LAS FUNCIONES
module.exports = {
    loginAuth,
    googleSigin
}