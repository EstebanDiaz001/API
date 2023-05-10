const mongoose = require("mongoose");
const esquemaCategoria = mongoose.Schema({
    
    id: {
        type: String,
        require: true
    }, //YA
    name: {
        type: String,
        require: true
    }, //YA
    description: {
        type: String,
        require: true
    }
});


// SE EXPORTA EL MODULO [mongoose.model(<Colección en la base de datos>, <esquema a usar en la base de datos>)]
module.exports = mongoose.model("categoria",esquemaCategoria);