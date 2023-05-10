const { response, request } = require("express");
require("dotenv").config();


// AUTENTICACIÓN DE LAS CREDENCIALES
const loginAuth = (req = request, res = response) => {

    const {user, password} = req.body;

    
    

}




// SE ECPORTAN LAS FUNCIONES
module.exports = {
    loginAuth,
}