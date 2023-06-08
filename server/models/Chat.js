const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');
const { Owner, Apprentice } = require('./User');

const Chat = sequelize.define('Chat', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Owner_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Owner,
            key: 'User_ID'
        }
    },
    Apprentice_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Apprentice,
            key: 'User_ID'
        }
    },
}, {
    timestamps: false,
    freezeTableName: true
});


module.exports = Chat;

