const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./users')

class Friends extends Model {};

Friends.init({
    friend_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'friends'
});

module.exports = Friends;