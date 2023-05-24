const { response, request } = require("express");
const Categoria = require("../database/schemas/categoriaSchema");




const crearCategoria = async(req = request, res = response)=>{

    const nombre =  req.body.nombre.toUpperCase();

    const categoriaDB =  await Categoria.findOne({nombre})
    if (categoriaDB) return res.status(400).json({
        msg:`La categoria ${categoriaDB.nombre}, ya existe`
    })

    // Generar la data a guardar

    const data = {
        nombre,
        usuario: req.body.user._id
    }

    const categoria = new Categoria(data)
    await categoria.save()
    res.status(201).json({categoria})
}

module.exports = {
    crearCategoria
}