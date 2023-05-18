const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  names: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  lastName: {
    type: String,
    required: [true, 'El apellido obligatorio'],
  },
  secondLastName: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isMobilePhone(value, 'es-CO');
      },
      message: 'El número de teléfono no es válido.'
    }
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: 'El email no es válido.'
    }
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    validate: {
      validator: function (value) {
        const options = {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 0,
          returnScore: false
        };

        return validator.isStrongPassword(value, options);
      },
      message: 'La contraseña no cumple los criterios de fortaleza.'
    }
  },
  img:{
    type: String,
    default:'noImage.png',
  },
  rol:{
    type: String,
    default:'USER_ROLE',
    enum: ['ADMIN_ROLE', 'USER_ROLE']
  },
  google:{
    type:Boolean,
    default:false
  },
});

userSchema.methods.toJSON = function(){
  const { __v, password, ...user} = this.toObject();
  return user;
}



const User = mongoose.model('User', userSchema);

module.exports = User;