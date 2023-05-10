const mongoose = require("mongoose");
const nowDate = Date.now

const esquemadeDeRegistro = mongoose.Schema({
    
    serialNumber: {
        type: String,
        require: true
    },
    token: {
        type: String,
        default: null
    },
    fechaSubida: {
        type: Date,
        default: nowDate
    },
    fechaExpiracion: {
        type: Date,
        require: true
    },
    usuarioSubida: {
        type: String,
        default: null
    },
    fechaPedido: {
        type: Date,
        default: null
    },
    usuarioPedido: {
        type: String,
        default: null
    },
    categoriaPedido: {
        type: String,
        default: null
    },
    descripcionPedido: {
        type: String,
        default: null
    },
    isUsed: {
        type: Boolean,
        default: false
    },
    isExpired: {
        type: Boolean,
        default: false
    },
});


// SE EXPORTA EL MODULO [mongoose.model(<Colección en la base de datos>, <esquema a usar en la base de datos>)]
module.exports = mongoose.model("registros",esquemadeDeRegistro);