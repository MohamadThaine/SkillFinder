const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');
const { Apprenticeship } = require('./Apprenticeship');

const Category = sequelize.define('Category', {
    ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [1, 50],
            notNull: {
                msg: 'Please enter a name'
            }
        }
    }
}, {
    tableName: 'category',
    timestamps: false
});



module.exports = Category;