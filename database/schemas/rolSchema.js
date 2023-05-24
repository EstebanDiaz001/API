const {Schema, model} = require('mongoose');

const rolSchema = new Schema({
  rol: {
    type: String,
    required: [true, 'El rol es obligatorio']
  },
});

const Rol = model('Roles', rolSchema);

module.exports = Rol;