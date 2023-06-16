const Announcement = require('../../models/Announcement');
const verifyToken = require('../../utils/verifyToken');
const addAnnouncement = async (req, res) => {
    if(!verifyToken(req)) return res.status(401).send({ message: 'Unauthorized', success: false });
    if(req.user.id !== parseInt(req.body.Owner_ID)) return res.status(401).send({ message: 'Unauthorized', success: false });
    const { Apprenticeship_ID, Subject, Content, Date_Of_Creation } = req.body;
    try {
        const announcement = await Announcement.create({
            Apprenticeship_ID,
            Subject,
            Content,
            Date_Of_Creation
        });
        res.status(200).send({ ID: announcement.ID, success: true });
    } catch (error) {
        res.send({ message: error, success: false});
    }
}

module.exports = addAnnouncement;
