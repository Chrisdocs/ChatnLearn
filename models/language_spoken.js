const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class LangSpk extends Model {};

LangSpk.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    lang_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'langSpk'
})

module.exports = LangSpk;