require("dotenv").config();
const { response, request } = require("express");
const User = require('../database/schemas/userSchema');
const bcrypt = require('bcryptjs');




const insertUser = async (req = request, res = response) => {
  const { names, lastName, secondLastName, email, password, confirmPassword, phoneNumber } = req.body;

  
  if (password !== confirmPassword) {
    console.log("Las contraseñas no coinciden");
    return res.status(400).json({ message: 'Las contraseñas no coinciden' });
  }
  
  try {
    // Verificar si ya existe un usuario con el mismo username o email
    const userWithUsername = await User.findOne({ names });
    
    if (userWithUsername) return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ names, lastName, secondLastName, phoneNumber, email, password: hashedPassword,  });
    await newUser.save();
    return res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
  } catch (error) {
    return res.status(400).json({ message: 'Error al crear el usuario', error });
  }
};

const updateUserPassword = async (req = request, res = response) => {

  const { email, password, newPassword, newPasswordConfirm } = await req.body;

  // if (!req.body.email || !req.body.password || req.body.newPasswordConfirm || req.body.newPassword) return res.status(400).json({ message: 'Hay campos sin llenar' });


  
  const user = await User.findOne({ email })
  return res.status(400).json({ message: user});

  // const passwordConcordance = bcrypt.compareSync(password, user.password);
  // const newPasswordHashed = bcrypt.hashSync(newPassword, 10);


  // if (passwordConcordance) {
  //   await User.findOneAndUpdate({ email }, { password: newPasswordHashed })
  //   return res.status(200).json({ message: passwordConcordance, user: user })
  // } else {
  //   return res.status(400).json({ error: 'Las Contraseñas no coinciden' })
  // }

  

}



module.exports = {
  insertUser,
  updateUserPassword
}