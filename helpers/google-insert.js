const User = require("../database/schemas/userSchema");

const googleInsert = async (googleUser, dataUser, res)=>{

    if ((dataUser.names&&dataUser.names&&dataUser.names&&dataUser.names)!=null) {
        
        usuario = new User(data);    
        await usuario.save(dataUser);

        return res.json({ok:"ok"});
    }else{
        res.status(405).json({
            msg:'Operacion invalida',
            success:false
        })
    }
}

module.exports = {
    googleInsert
}