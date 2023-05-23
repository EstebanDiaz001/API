require("dotenv").config();
const { response, request } = require("express");

const User = require('../database/schemas/userSchema');
const bcrypt = require('bcryptjs');
const { validarDNI } = require("../helpers/validar_dni");




const insertUser = async (req = request, res = response) => {
  const { names, lastName, secondLastName, typeDNI, DNI, email, password, confirmPassword, phoneNumber } = req.body;

  const checkDNI = validarDNI(typeDNI, DNI)
  if (!checkDNI) return res.status(400).json({ errors:[{
    value:DNI,
    msg:`El DNI ${DNI} no coincide con el formato para ${typeDNI}`,
    path:'DNI'
  }] })

  
  if (password !== confirmPassword) {
    console.log("Las contraseñas no coinciden");
    return res.status(400).json({errors : [{
      value:'password',
      msg:`Las contraseñas no coinciden`,
      path:'password'
    }]});
  }
  
  try {
    

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ names, lastName, secondLastName, typeDNI, DNI, phoneNumber, email, password: hashedPassword,  });
    await newUser.save();
    return res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser, success: true });
  } catch (error) {
    return res.status(400).json({ message: 'Error al crear el usuario', error, success: false });
    
  }
};

const updateUser = async (req = request, res = response) => {

  const usuarioAutenticado = req.body.user
  const { email, password, newPassword, newPasswordConfirm } = req.body;



  
  return res.status(400).json({ usuarioAutenticado });

  /* AQUI VA EL RESTO DEL CODIGO
// const newPasswordHashed = bcrypt.hashSync(newPassword, 10);


// if (passwordConcordance) {
//   await User.findOneAndUpdate({ email }, { password: newPasswordHashed })
//   return res.status(200).json({ message: passwordConcordance, user: user })
// } else {
//   return res.status(400).json({ error: 'Las Contraseñas no coinciden' })
// }
// const passwordConcordance = bcrypt.compareSync(password, user.password);
*/

  

}



module.exports = {
  insertUser,
  updateUser
}