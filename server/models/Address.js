const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');
const { Owner } = require('./User');

const Address = sequelize.define('address', {
    ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    City: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 50],
            notNull: {
                msg: 'Please enter a city'
            }
        }
    },
    Street_NO: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter a street number'
            }
        }
    },
    Street_Name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter a street name'
            }
        }
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter a description'
            }
        }
    },
    Owner_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Owner,
            key: 'User_ID'
        }
    }
}, {
    tableName: 'address',
    timestamps: false
});

Address.belongsTo(Owner, { foreignKey: 'Owner_ID' });

module.exports = Address;