const {Schema, model} = require('mongoose');
const validator = require('validator');

const userSchema = new Schema({
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
  DNI: {
    type: String,
    uppercase:true,
    required: [true,'El DNI es obligatorio'],
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
  typeDNI:{
    type: String,
    required:[true, 'El tipo de DNI es obligatorio'],
    enum: ['CC','PASAPORTE']
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

// userSchema.methods.toJSON = function(){
//   const { __v, password, _id,  ...user} = this.toObject();
//   user.uid = _id
//   return user;
// }
 


const User = model('User', userSchema);

module.exports = User;