const mongoose = require("mongoose");
const nowDate = Date.now

const userSchema = mongoose.Schema({
    
    username: {
        type: "String"
      },
      password: {
        type: "String"
      }
});


// SE EXPORTA EL MODULO [mongoose.model(<Colección en la base de datos>, <esquema a usar en la base de datos>)]
module.exports = mongoose.model("registros",esquemadeDeRegistro);