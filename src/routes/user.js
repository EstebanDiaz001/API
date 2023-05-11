const express = require("express");
const { insertUser, updateUserPassword } = require("../../controllers/user.controller");
const router = express.Router();



// RUTAS DE LOS USUARIOS

router.post('/userRegister',insertUser);

router.put('/userUpdate',updateUserPassword);

module.exports = router;