const md5 = require('md5');
const jwt = require('jsonwebtoken');

//Models
const User = require('../models/User');

const logIn = async(mail, password) => {
    try {
        if (!mail || mail == '') throw new Error("Debe enviar un mail");
        if (!password || password == '') throw new Error("Debe enviar un password");
        let passwordMd5 = md5(password);

        let userDB = await User.findOne({ where: { mail: mail.toLowerCase(), password: passwordMd5 } });
        if (!userDB) throw new Error('Credenciales incorrectas');
        if (userDB && !userDB.status) throw new Error('Usuario bloqueado');

        let exp = Math.floor(Date.now() / 1000) + parseInt(process.env.JWT_TOKEN_EXP);

        let token = jwt.sign({
            exp: exp,
            user: userDB
        }, process.env.JWT_SECRET);

        return {
            user: userDB,
            token: token
        };

    } catch (error) {
        throw error;
    }
}

module.exports = {
    logIn
};