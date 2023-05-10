const express = require("express"); 
const router = express.Router();
const { 
    consultaDisponible,
    consultaCategoria,
    consultaPaginado,
    consultaToken,
    consultaTodos
} = require("../../controllers/consultas.controller");


// RUTAS DE LAS CONSULTAS CONSULTAS 

// CONSULTA A LA CANTIDAD DE TOKENS DISPONIBLES (ACTUALMENTE EN DESUSO)
router.post("/consultaTokenDisponible", consultaDisponible);
// CONSULTA DEL PAGINADO
router.post("/consultaPaginado", consultaPaginado);
// CONSULTA DEL TOKEN DISPONIBLE
router.put("/consultaToken", consultaToken);
// CONSULTA A LAS CATEGORIAS
router.get('/categoria', consultaCategoria);
// CONSULTA TODOS LOS REGISTROS
router.post("/consultaTodos", consultaTodos)

module.exports = router;