const {response, request} = require('express')
var jwt = require('jsonwebtoken');
const User = require('../database/schemas/userSchema');


const validarJWT = async (req = request, res = response, next)=>{

    const token = req.header('xtoken')

    if (!token) {
        return res.status(400).json({msg:'Falta el token en la petición'})
    }


    try {

        const {_id} = jwt.verify(token, process.env.SECRETORPUBLICKEY)
        const user = await User.findById(_id)
        
        if (!user) return res.status(401).json({msg:'Token no válido: El usuario no existe en la DB'})


        req.body.user = user
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({msg:'Token no valido'})
    }
    

}


module.exports = validarJWT;