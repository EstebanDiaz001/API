require("dotenv").config();
const { response, request } = require("express");

const User = require('../database/schemas/userSchema');
const bcrypt = require('bcryptjs');




const insertUser = async (req = request, res = response) => {
  const { names, lastName, secondLastName, typeDNI, DNI, email, password, confirmPassword, phoneNumber } = req.body;

  
  if (password !== confirmPassword) {
    console.log("Las contraseñas no coinciden");
    return res.status(400).json({ message: 'Las contraseñas no coinciden' });
  }
  
  try {
    

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ names, lastName, secondLastName, phoneNumber, email, password: hashedPassword,  });
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