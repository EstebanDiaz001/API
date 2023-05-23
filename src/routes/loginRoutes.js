const express = require("express"); 
const router = express.Router();
const validarChecks = require("../../middlewares/validar-checks");
const { loginAuth, googleSigin } = require("../../controllers/login.controller");
const { loginAuthChecks, googleChecks } = require("../../middlewares/validar-campos");


// RUTAS DEL LOGIN

// VALIDAR CREDENCIALES
router.post('/login', [ loginAuthChecks ,validarChecks] ,loginAuth);

// REGISTRAR NUEVOS USUARIO con google
router.post('/google', [googleChecks,validarChecks] ,googleSigin);



module.exports = router;
