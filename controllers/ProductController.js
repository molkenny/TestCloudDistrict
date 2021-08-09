const md5 = require('md5');

//Models
const User = require('../models/User');
const Product = require('../models/Product');

const list = async(limit, offset, filters) => {
    try {
        return await Product.findAndCountAll({ where: filters, limit, offset });
    } catch (error) {
        throw error;
    }
};

const find = async(id) => {
    try {
        return await Product.findByPk(id);
    } catch (error) {
        throw error;
    }
};

const add = async(name, description, base_price, iva, id_user) => {
    try {
        if (!name || name == '') throw new Error("Debe enviar un name");
        if (!description || description == '') throw new Error("Debe enviar una description");
        if (typeof base_price == 'undefined' || base_price == '') throw new Error("Debe enviar un base_price");
        if (typeof iva == 'undefined' || iva == '') throw new Error("Debe enviar un iva");

        //Check if there is another product with that name

        let productDB = await Product.findOne({ where: { name } });
        if (productDB) throw new Error("Ya existe ese producto");

        const datos = {
            name,
            description,
            base_price: parseFloat(base_price).toFixed(2),
            iva: parseFloat(iva).toFixed(2),
            final_price: (parseFloat(base_price) * (1 + (parseFloat(iva) / 100))).toFixed(2),
            available: true,
            id_user_creator: id_user
        }

        return await Product.create(datos);

    } catch (error) {
        throw error;
    }
};

const edit = async(id, name, description, base_price, iva, available) => {
    try {
        if (!name || name == '') throw new Error("Debe enviar un name");
        if (!description || description == '') throw new Error("Debe enviar una description");
        if (typeof base_price == 'undefined' || base_price == '') throw new Error("Debe enviar un base_price");
        if (typeof iva == 'undefined' || iva == '') throw new Error("Debe enviar un iva");

        //Check if there is another product with that name

        let productDB = await Product.findByPk(id);
        if (!productDB) throw new Error("No existe ese producto");

        const datos = {
            name,
            description,
            base_price: parseFloat(base_price).toFixed(2),
            iva: parseFloat(iva).toFixed(2),
            final_price: (parseFloat(base_price) * (1 + (parseFloat(iva) / 100))).toFixed(2),
            available: typeof iva !== 'undefined' ? available : productDB.available
        }

        return await productDB.update(datos);

    } catch (error) {
        throw error;
    }
};

const destroy = async(id) => {
    try {
        let productDB = await Product.findByPk(id);
        if (!productDB) throw new Error("No existe ese producto");

        return await productDB.destroy(id);

    } catch (error) {
        throw error;
    }
};

module.exports = {
    list,
    find,
    add,
    edit,
    destroy
};