const md5 = require('md5');

//Models
const User = require('../models/User');
const UserGroup = require('../models/UserGroup');

const list = async(limit, offset) => {
    try {
        return await User.findAndCountAll({ limit, offset });
    } catch (error) {
        throw error;
    }
};

const add = async(name, mail, password, id_group) => {
    try {
        if (!name || name == '') throw new Error("Debe enviar un name");
        if (!mail || mail == '') throw new Error("Debe enviar un mail");
        if (!password || password == '') throw new Error("Debe enviar un password");
        if (typeof id_group == 'undefined') throw new Error("Debe enviar un id_group");

        let userDB = await User.findOne({ where: { mail } });
        if (userDB) throw new Error("Ya existe un usuario con ese mail");

        let groupDB = await UserGroup.findOne({ where: { id: id_group } });
        if (!groupDB) throw new Error("No existe ese grupo");

        return await User.create({
            name,
            mail,
            password: md5(password),
            id_group,
            status: true
        });
    } catch (error) {
        throw error;
    }
};

const edit = async(id, name, mail, password, id_group, status) => {
    try {
        if (!name || name == '') throw new Error("Debe enviar un name");
        if (!mail || mail == '') throw new Error("Debe enviar un mail");
        if (typeof id_group == 'undefined') throw new Error("Debe enviar un id_group");
        if (typeof status == 'undefined') throw new Error("Debe enviar un status");

        let userDB = await User.findByPk(id);
        if (!userDB) throw new Error("No existe ese usuario");

        let groupDB = await UserGroup.findOne({ where: { id: id_group } });
        if (!groupDB) throw new Error("No existe ese grupo");

        let datos = {
            name,
            mail,
            password: md5(password),
            id_group,
            status
        };

        if (typeof password == 'undefined') datos.password = md5(password);

        return await userDB.update(datos);

    } catch (error) {
        throw error;
    }
};

const destroy = async(id) => {
    try {
        let userDB = await User.findByPk(id);
        if (!userDB) throw new Error("No existe ese usuario");

        return await userDB.destroy(id);

    } catch (error) {
        throw error;
    }
};

module.exports = {
    list,
    add,
    edit,
    destroy
};