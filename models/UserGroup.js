const { Sequelize, DataTypes, Model } = require('sequelize');
const User = require('../models/User');


class UserGroup extends Model {}

UserGroup.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
}, {
    paranoid: true,
    freezeTableName: true,
    sequelize,
    modelName: 'UserGroup',
    tableName: 'user_groups'
});

UserGroup.prototype.toJSON = function() {
    let values = Object.assign({}, this.get());
    return values;
};

UserGroup.hasMany(User, { foreignKey: 'id_group', sourceKey: 'id' });
User.belongsTo(UserGroup, { foreignKey: 'id_group', targetKey: 'id' });

module.exports = UserGroup;