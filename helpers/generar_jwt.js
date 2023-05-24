var jwt = require('jsonwebtoken');

const generarJWT = ( _id = '') =>{

    return new Promise((resolve, reject) => {
        
        const playload = { _id };

        jwt.sign( playload, process.env.SECRETORPUBLICKEY, {
            expiresIn:'4h'
        }, (err, token) =>{
            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            } else {
                resolve(token)
            }
        } )





    })

}


module.exports = generarJWT;