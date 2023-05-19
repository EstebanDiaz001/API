const { response, request } = require("express");
require("dotenv").config();


// AUTENTICACIÓN DE LAS CREDENCIALES
const loginAuth = (req = request, res = response) => {

    res.status(200).json({success:true})

}




// SE ECPORTAN LAS FUNCIONES
module.exports = {
    loginAuth,
}