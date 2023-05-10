require("dotenv").config();
const { response, request} = require("express");
const esquemadeDeRegistro = require("../database/schema/esquemaRegistro");
const esquemaCategoria = require("../database/schema/esquemaCategoria");
const csv = require('csvtojson');

// SE INSERTAN LOS REGISTROS RECIBIDOS DEL FRONTEND
const insertarRegstros = async (req = request, res = response) => {
    console.log(req.body);   
    const { registros, user } = req.body;
    const encabezadoEsperado = process.env.ENCABEZADOESPERADO;
    const bufferDescodificado = Buffer.from(registros, "base64");
    const stringDecodificado = bufferDescodificado.toString("utf-8");

    // SE VALIDA EL CUERPO DEL CSV OBTENIDO
    // Se divide la cadena en lineas
    const lines = stringDecodificado.split(/\r?\n/);
    // se verifica que la ultima linea esté o no vaciía
    const lastLineIsEmpty = lines[lines.length - 1] === '';
    const encabezadoObtenido = lines[0];
    const validarCuerpo = lines.slice(1, lastLineIsEmpty ? -1 : undefined).every(line => {
        const columns = line.split(',');
        return columns.length === encabezadoEsperado.split(',').length;
    });
    // SE VALIDA EL CSV OBTENIDO CON LA CABECERA ESPERADA
    const validarEncabezado = encabezadoEsperado === encabezadoObtenido;

    if (validarEncabezado && validarCuerpo) {
        const objeto = await csv().fromString(stringDecodificado);
        objeto.forEach(objeto => {
            // Se añade el nombre del usuario proporcionado
            objeto.usuarioSubida = user;
            // Se arreglan los encabezados a los campos en el esquema de registro en la base de datos
            objeto.fechaExpiracion = objeto["Expires at"];
            delete objeto["Expires at"];
            objeto.serialNumber = objeto["Serial number"];
            delete objeto["Serial number"];
            objeto.token = objeto.PIN;
            delete objeto["PIN"];
        });
        // Se validan los registros exitentes en la base de datos
        const existingRecords = await esquemadeDeRegistro.find({ serialNumber: { $in: objeto.map(obj => obj.serialNumber) } });
        const resgistrosEsxistentes = existingRecords.map(record => record.serialNumber);
        // Se filtran los registros existentes en la base de datos
        const nuevosRegsitros = objeto.filter(obj => !resgistrosEsxistentes.includes(obj.serialNumber));
        const registrosValidos = nuevosRegsitros.filter(obj => {
            const fechaExpiracion = new Date(obj.fechaExpiracion);
            return fechaExpiracion > Date.now();
        });
        // Se toman los registros que tengan una fecha invalida y se filtran
        const registrosInvalidos = nuevosRegsitros.filter(obj => {
            const fechaExpiracion = new Date(obj.fechaExpiracion);
            return fechaExpiracion <= Date.now();
        });
        if (registrosValidos.length > 0) {
            await esquemadeDeRegistro.insertMany(registrosValidos);
            res.status(201).json({
                message: `${registrosValidos.length} Registros insertados de ${objeto.length} y ${registrosInvalidos.length} registros vencidos filtrados`,
                filtrados: registrosInvalidos
            });
        } else {
            res.status(422).json({
                message: `sin registros nuevos a subir en la base de datos y ${registrosInvalidos.length} registros vencidos`,
                filtrados: registrosInvalidos
            });
        }
    } else {
        res.status(401).json({ message: "Entrada de datos invalida"});
    }
}

const insertarCategorias = async (req = request, res = response) => {

    const {id, name, description} = req.body

    if (!req.body.id || !req.body.name || !req.body.description) {
    res.status(400).json({message : "Llene los campos correctamente"})
    }else{
        const categoria = new esquemaCategoria({
            id : id,
            name:name,
            description:description
        })
        categoria.save()
    
        res.status(200).json({message : "Categoria subida correctamente"})   
    }

}

module.exports = {
    insertarRegstros,
    insertarCategorias
}