const message = require('../../models/Message');
const verifyToken = require('../../utils/verifyToken');
const getMessages = async (req, res) => {
    if(!verifyToken(req)) return res.status(401).json({message: 'Unauthorized'});
    const {chatID, userID} = req.params;
    if(parseInt(userID) !== req.user.id) return res.status(401).json({message: 'Unauthorized'});
    const messages = await message.findAll({
        where: {
            Chat_ID: chatID
        },
        order : [
            ['Date_Of_Creation', 'ASC']
        ]
    });
    res.status(200).json({messages, success: true});
}

module.exports = getMessages;