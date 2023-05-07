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

Category.associations = () => {
    Category.hasMany(Apprenticeship, {
        foreignKey: 'Category_ID'
    });
}


module.exports = Category;