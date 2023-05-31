require("dotenv").config();
const { response, request } = require("express");

const User = require('../database/schemas/userSchema');
const bcrypt = require('bcryptjs');
const { validarDNI } = require("../helpers/validar_dni");




const insertUser = async (req = request, res = response) => {
  const { names, lastName, secondLastName, typeDNI, DNI, email, password, confirmPassword, phoneNumber } = req.body;

  const checkDNI = validarDNI(typeDNI, DNI)
  if (!checkDNI) return res.status(400).json({
    errors: [{
      value: DNI,
      msg: `El DNI ${DNI} no coincide con el formato para ${typeDNI}`,
      path: 'DNI'
    }]
  })


  if (password !== confirmPassword) {
    console.log("Las contraseñas no coinciden");
    return res.status(400).json({
      errors: [{
        value: 'password',
        msg: `Las contraseñas no coinciden`,
        path: 'password'
      }]
    });
  }

  try {


    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ names, lastName, secondLastName, typeDNI, DNI, phoneNumber, email, password: hashedPassword, });
    await newUser.save();
    return res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser, success: true });
  } catch (error) {
    return res.status(400).json({ message: 'Error al crear el usuario', error, success: false });

  }
};

const getUser = async (req = request, res = response) => {

  const usuarioAutenticado = req.body.user
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email })

    const equal = bcrypt.compareSync(password, user.password)
    const equalUser = usuarioAutenticado.email == email

    if (!equal) return res.status(400).json({ msg: 'La contraseña es incorrecta' })
    if (!equalUser) return res.status(400).json({ msg: 'El token no coincide con el correo ingresado' })





    return res.status(200).json({ user, success: equal });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Algo salió mal' })
  }
}

const updateUser = async (req = request, res = response) => {
  
  const { names, lastName, secondLastName, typeDNI, DNI, email, oldPassword, newPassword, confirmNewPassword, phoneNumber } = req.body;
  const hashedPassword = bcrypt.hashSync(oldPassword, 10);
  const usuarioAutenticado = req.body.user

  
  const equal = bcrypt.compareSync(req.body.oldPassword, usuarioAutenticado.password)
  if (!equal) return res.status(400).json({
    value:"Password",
    msg: 'La contraseña actual es incorrecta',
    success: false
  })

  const checkDNI = validarDNI(typeDNI, DNI)
  if (!checkDNI) return res.status(400).json({
    errors: [{
      value: DNI,
      msg: `El DNI ${DNI} no coincide con el formato para ${typeDNI}`,
      path: 'DNI'
    }]
  })

  if (newPassword !== confirmNewPassword) {
    console.log("Las contraseñas nuevas no coinciden");
    return res.status(400).json({
      errors: [{
        value: 'password',
        msg: `Las contraseñas no coinciden`,
        path: 'password'
      }]
    });
  }
  
  try {
    
    const uptdate = await User.findOneAndUpdate({email:usuarioAutenticado.email},
      {
        names,
        lastName,
        secondLastName,
        DNI,
        email,
        password:hashedPassword,
        phoneNumber,
        typeDNI,
      })

      console.log({uptdate});

    return res.json({
      msg: 'Información actualizada corrextamente',
      success: true
    });
  } catch (error) {
    
  }



}



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






module.exports = {
  insertUser,
  getUser,
  updateUser
}