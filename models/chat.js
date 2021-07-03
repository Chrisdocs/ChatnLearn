const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
const User = require('./User');
const router = require('../controllers/api/user-routes');

class Chat extends Model {

}

Chat.init({
    chat_id: {
        type: DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'chat'
});

module.exports = Chat;