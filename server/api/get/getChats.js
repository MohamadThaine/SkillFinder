const Chat = require('../../models/Chat');
const Message = require('../../models/Message');
const sequelize = require('../../sequelize');
const verifyToken = require('../../utils/verifyToken');

const getChats = async (req, res) => {
    const { id, isOwner } = req.params;
    if (!verifyToken(req)) return res.status(401).json({ message: 'Unauthorized' });
    if (parseInt(id) !== req.user.id) return res.status(401).json({ message: 'Unauthorized' });
    const chats = await sequelize.query(`
    SELECT chat.*, message.Content, user.Name, user.Gender ${isOwner === 'false' ? ',apprenticeship_owner.Picture' : ''}
    FROM Chat
    JOIN Message ON chat.ID = message.Chat_ID
    JOIN User ON chat.${!isOwner === 'true' ? 'Owner_ID' : 'Apprentice_ID'} = user.ID
    ${isOwner === 'false' ? 'JOIN apprenticeship_owner ON apprenticeship_owner.User_ID = chat.Owner_ID' : ''}
    WHERE chat.${isOwner === 'true' ? 'Owner_ID' : 'Apprentice_ID'} = ${id}
    AND message.Date_Of_Creation = (
      SELECT MAX(Date_Of_Creation)
      FROM Message
      WHERE Chat_ID = chat.ID
    )
    ORDER BY message.Date_Of_Creation DESC
  `, { type: sequelize.QueryTypes.SELECT });
    
    const processedChats  = chats.map((chat) => {
        if (isOwner === 'false' && chat.Picture) {
            const pictureUrl = `${req.protocol}://${req.get('host')}/${chat.Picture}`;
            return { ...chat, Picture: pictureUrl };
        }
        return chat;
    });

    res.status(200).json({ chats: processedChats, success: true });
}

module.exports = getChats;