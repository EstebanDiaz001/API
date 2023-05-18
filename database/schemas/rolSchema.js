const mongoose = require('mongoose');

const rolSchema = new mongoose.Schema({
  rol: {
    type: String,
    required: [true, 'El rol es obligatorio']
  },
});

const Rol = mongoose.model('Roles', rolSchema);

module.exports = Rol;