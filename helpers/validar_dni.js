const validator = require('validator');

const validarDNI = (type, DNI) => {
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
}

module.exports = {
  validarDNI
}