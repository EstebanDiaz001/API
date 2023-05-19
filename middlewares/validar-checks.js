const {validationResult} = require('express-validator')


const validarChecks = (req , res , next) =>{
    let errors = validationResult(req);

    mapped = errors.errors.map(element => ({
        value: element.value,
        msg: element.msg,
        path: element.path
    }));


    if (!errors.isEmpty()) {
        return res.status(400).json({errors:mapped, success:false})
    }
    next();
}

module.exports = validarChecks;