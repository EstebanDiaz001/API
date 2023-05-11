require("dotenv").config();
const { response, request } = require("express");
const User = require('../database/schema/userSchema');
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");




const insertUser = async (req = request, res = response) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    console.log("Las contraseñas no coinciden");
    return res.status(400).json({ message: 'Las contraseñas no coinciden' });
  }

  try {
    // Verificar si ya existe un usuario con el mismo username o email
    const userWithUsername = await User.findOne({ username });
    const userWithEmail = await User.findOne({ email });

    if (userWithUsername) res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
    if (userWithEmail) res.status(400).json({ message: 'El correo electrónico ya está en uso' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el usuario', error });
  }
};

const updateUser = async (req = request, res = response) => {
  
}



module.exports = {
  insertUser,
  updateUser
}