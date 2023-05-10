const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');
const { Apprenticeship } = require('./Apprenticeship');

const Category = sequelize.define('Category', {
    ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'category',
    timestamps: false
});



module.exports = Category;