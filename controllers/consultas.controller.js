const { response, request } = require("express")
const esquemadeDeRegistro = require("../database/schema/esquemaRegistro")
const esquemaCategoria = require("../database/schema/esquemaCategoria")

// CONSULTA DE LA CANTIDAD DE TOKENS DISPONIBLES (ACTUALMENTE EN DESUSO)
const consultaDisponible = async(req = request, res = response) => {

    esquemadeDeRegistro.countDocuments({isUsed : false})
        .then((registro) =>{
            console.log({token : registro})
            res.status(200).json({message: "Enviado correctamente", tokensDisponibles : registro})
        })
        .catch((error) =>{
            console.log(error)
            res.status(404).json({error:"No hay registros en la base de datos"})
        })
}
// CONSULTA DE LAS CATEGORIAS DE LOS TOKENS
const consultaCategoria = async (req = request, res = response) => {
    // BUSCA TODAS LAS CATEGORIAS EN LA BASE DE DATOS
    const tabla = await esquemaCategoria.find()
    const consultaCategoria = []
    console.log(req.body);    
    
    tabla.forEach(registro => {
        // GUARDA LAS CATEGORIAS EN ARREGLO
        consultaCategoria.push({id: registro.id,name:registro.name, description: registro.description})
    });
    
    res.status(200).json(consultaCategoria)    
    
}
// CONSULTA DE LOS REGISTROS PAGINADOS
const consultaPaginado = async(req = request, res = response) => {
    let allData = null;
    const {filtros, pagina, cantidadRegistros } = req.body;
    console.log(req.body)


    try {
        
        allData = await esquemadeDeRegistro.find({isExpired:false})
        allDataGrilla = await esquemadeDeRegistro.find(filtros[0]).sort(filtros[1]).skip((pagina-1) * cantidadRegistros).limit(cantidadRegistros);

        total = await esquemadeDeRegistro.countDocuments();
        totalDisponible = await esquemadeDeRegistro.countDocuments({isUsed:false,isExpired:false})


        allData.forEach( async registro => {
            if (registro.fechaExpiracion < Date.now()) {

                busqueda = await esquemadeDeRegistro.findOneAndUpdate({serialNumber:registro.serialNumber}, {isExpired:true})
                console.log(busqueda)
            }
        });


    } catch (error) {
        res.status(404).json({error:"Consulta Invalida"})
    }

    res.status(200).json({message: "Datos cargados correctamente", registros : allDataGrilla, registrosCantidad : total, cantidadTokensDisp : totalDisponible})
}
// CONSULTA DE TODOS LOS REGISTROS
const consultaTodos = async(req = request, res = response) => {
    let allData = null;
    const {filtros} = req.body;
    console.log(req.body)


    try {
        
        allData = await esquemadeDeRegistro.find({isExpired:false})
        allDataGrilla = await esquemadeDeRegistro.find(filtros[0]).sort(filtros[1]);

        total = await esquemadeDeRegistro.countDocuments();
        totalDisponible = await esquemadeDeRegistro.countDocuments({isUsed:false,isExpired:false})


        allData.forEach( async registro => {
            if (registro.fechaExpiracion < Date.now()) {

                busqueda = await esquemadeDeRegistro.findOneAndUpdate({serialNumber:registro.serialNumber}, {isExpired:true})
                console.log(busqueda)
            }
        });


    } catch (error) {
        // res.status(404).json({error:"Consulta invalida"})
        console.log(error);
        // if(!error)res.status(200).json({message: "Datos cargados correctamente", registros : allDataGrilla, registrosCantidad : total, cantidadTokensDisp : totalDisponible})
    }
    res.status(200).json({message: "Datos cargados correctamente", registros : allDataGrilla, registrosCantidad : total, cantidadTokensDisp : totalDisponible})

}
// CONSULTA DE TOKEN DISPONIBLE
const consultaToken = async(req = request, res = response) => {

    const {categoriaPedido, description, user} = req.body
    console.log(req.body)
    // Se valida que la descripción no esté vacía
    if (!req.body.categoriaPedido || !req.body.description || !req.body.user ) res.status(404).json({error:"Faltan datos"})
    if (description.length <= 25 ) {
        res.status(404).json({error:"La descripción debe ser mayor a 25 Caracteres"})
    }else{
         //Valida tokens expirados
    allData = await esquemadeDeRegistro.find({IsExpired:false})
    await allData.forEach( async registro => {
            if (registro.FechaExpiracion < Date.now()) {

                busqueda = await esquemadeDeRegistro.findOneAndUpdate({serialNumber:registro.serialNumber}, {isExpired:true})
                console.log(busqueda);
            }
        })
    
    esquemadeDeRegistro.findOneAndUpdate(
        //Filtro para la busquda
        {isUsed:false, isExpired:false},
        //Valores a actualizar
        {
            isUsed:true,
            usuarioPedido: user,
            categoriaPedido:categoriaPedido,
            descripcionPedido:description,
            fechaPedido:Date.now()
        }
        )
        .then((registro) =>{


            res.status(200).json({
                message: "Enviado correctamente",
                token : registro.token,
                categoriaPedido: categoriaPedido,
                descripcionPedido:description,
                fechaExpiracion:new Date(Date.now() + 86400000)  ,
                user:user
            })
        })
        .catch((error) =>{
            console.log(error)
            res.status(404).json({error:"No se encontró un registro en la base de datos"})
        })
    }

}


// EXPORTAR LAS FUNCIONES
module.exports = {
    consultaDisponible, 
    consultaCategoria,
    consultaPaginado,
    consultaToken,
    consultaTodos
}