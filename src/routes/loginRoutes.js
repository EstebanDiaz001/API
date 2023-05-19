const express = require("express"); 
const router = express.Router();
const { loginAuth } = require("../../controllers/login.controller");
const validarChecks = require("../../middlewares/validar-checks");
const { loginAuthChecks } = require("../../middlewares/validar-campos");


// RUTAS DEL LOGIN

// VALIDAR CREDENCIALES
router.post('/login', [ loginAuthChecks ,validarChecks] ,loginAuth);



module.exports = router;
