const Message = require('../../models/Message');
const verifyToken = require('../../utils/verifyToken');
const sendMessage = async (req, res) => {
    const { Chat_ID, Sender_ID, Receiver_ID, Content } = req.body;
    if(!verifyToken(req)) return res.status(401).json({ message: 'Unauthorized' });
    if(req.user.id !== Sender_ID) return res.status(401).json({ message: 'Unauthorized' });
    const message = await Message.create({
        Chat_ID,
        Sender_ID,
        Receiver_ID,
        Content: Content,
        Date_Of_Creation: new Date()
    });
    res.status(200).json({ message, success: true });
}

module.exports = sendMessage;