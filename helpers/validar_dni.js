const validator = require('validator');

const validarDNI = (type, DNI) => {
  try {
    switch (type) {
      case 'CC':
        const expresionCC = /^\d{10}$/;
        return validator.matches(DNI, expresionCC);
      case 'PASAPORTE':
        const expresionPasaporte = /^[a-zA-Z0-9]{9}$/;
        return validator.matches(DNI, expresionPasaporte);
      default:
        return false;
    }
  } catch (error) {
    return res.status(500).json({errors : [{
      msg:`Algo salió mal`,
    }]});

  }
}

module.exports = {
  validarDNI
}