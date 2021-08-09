const { Sequelize, DataTypes, Model } = require('sequelize');

class Product extends Model {}

Product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    base_price: DataTypes.FLOAT,
    final_price: DataTypes.FLOAT,
    iva: DataTypes.FLOAT,
    available: DataTypes.BOOLEAN,
    id_user_creator: DataTypes.BIGINT
}, {
    paranoid: true,
    freezeTableName: true,
    sequelize,
    modelName: 'Product',
    tableName: 'products'
});

Product.prototype.toJSON = function() {
    let values = Object.assign({}, this.get());
    return values;
};



module.exports = Product;