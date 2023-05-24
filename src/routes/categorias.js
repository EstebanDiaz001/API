const express = require("express");
const router = express.Router();
const validarChecks = require("../../middlewares/validar-checks");
const {
  loginAuth,
  googleSigin,
} = require("../../controllers/login.controller");
const { crearCategoria } = require("../../controllers/categorias.controller");
const { crearCategoriaChecks } = require("../../middlewares/validar-campos");

// RUTAS

// OBTENER TODAS LAS CATEGORIAS - PUBLICO
router.get("/", (req, res) => {
  res.status(200).json({ msg: "get" });
});

// OBTENER UNA CATEGORIA POR ID - PUBLICO
router.get("/:id", (req, res) => {
  res.status(200).json({ msg: "get - idparams" });
});

// CREAR UNA CATEGORIA - PRIVADO POR TOKEN VALIDO
router.post("/crearCategoria", [crearCategoriaChecks, validarChecks], crearCategoria);

// ACTUALIZAR UNA CATEGORIA POR ID - PRIVADO POR TOKEN VALIDO
router.put("/:id", (req, res) => {
  res.status(200).json({ msg: "put - idparams" });
});

// BORRAR UNA CATEGORIA - ADMIN
router.delete("/:id", (req, res) => {
  res.status(200).json({ msg: "delete - idparams" });
});

module.exports = router;
