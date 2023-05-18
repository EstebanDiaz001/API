
//Método para confirmar la concordancia de las contraseñas
const passwordConcordance = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        console.log("Las contraseñas no coinciden");
        return res.status(400).json({ message: 'Las contraseñas no coinciden' });
      }

}