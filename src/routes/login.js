const express = require("express"); 
const router = express.Router();
const { loginAuth } = require("../../controllers/login.controller");


// RUTAS DEL LOGIN

// VALIDAR CREDENCIALES
router.post('/login', loginAuth);


module.exports = router;
