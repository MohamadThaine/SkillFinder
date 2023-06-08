const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');
const Chat = require('./Chat');

const Message = sequelize.define('Message', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Chat_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Chat,
            key: 'ID'
        }
    },
    Sender_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Receiver_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Date_Of_Creation: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Message.belongsTo(Chat, {
    foreignKey: 'Chat_ID'
});

module.exports = Message;