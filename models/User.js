const { Sequelize, DataTypes, Model } = require('sequelize');
const Product = require('../models/Product');

class User extends Model {}

User.init({
    name: DataTypes.STRING,
    mail: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    id_group: DataTypes.BIGINT,
}, {
    paranoid: true,
    freezeTableName: true,
    sequelize,
    modelName: 'User',
    tableName: 'users'
});

User.prototype.toJSON = function() {
    let values = Object.assign({}, this.get());
    delete values.password;
    return values;
};

User.hasMany(Product, { foreignKey: 'id_user_creator', sourceKey: 'id' });
Product.belongsTo(User, { foreignKey: 'id_user_creator', targetKey: 'id' });

module.exports = User;