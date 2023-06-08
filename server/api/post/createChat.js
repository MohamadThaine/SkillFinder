const Chat = require('../../models/Chat');
const Message = require('../../models/Message');
const verifyToken = require('../../utils/verifyToken');

const createChat = async (req, res) => {
    const { Owner_ID, Apprentice_ID, Message_Text, isOwner } = req.body;
    if (!verifyToken(req)) return res.status(401).json({ message: 'Unauthorized' });
    if (isOwner && req.user.id !== Owner_ID) return res.status(401).json({ message: 'Unauthorized' });
    if (!isOwner && req.user.id !== Apprentice_ID) return res.status(401).json({ message: 'Unauthorized' });
    const chatExists = await Chat.findOne({
        where: {
            Owner_ID,
            Apprentice_ID
        }
    });
    if (chatExists) {
        const message = await createMessage(chatExists.ID, Owner_ID, Apprentice_ID, Message_Text, isOwner);
        res.status(200).json({ chat: chatExists, message, success: true });
    }
    else {
        const chat = await Chat.create({
            Owner_ID,
            Apprentice_ID,
        });
        const message = await createMessage(chat.ID, Owner_ID, Apprentice_ID, Message_Text, isOwner);
        res.status(200).json({ chat: chatExists, message, success: true });
    }
}

const createMessage = async (Chat_ID, Owner_ID, Apprentice_ID, Content, isOwner) => {
    const Sender_ID = isOwner ? Owner_ID : Apprentice_ID;
    const Receiver_ID = isOwner ? Apprentice_ID : Owner_ID;
    return await Message.create({
        Chat_ID,
        Sender_ID,
        Receiver_ID,
        Content,
        Date_Of_Creation: new Date()
    });
};

module.exports = createChat;