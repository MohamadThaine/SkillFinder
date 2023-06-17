const Announcement = require('../../models/Announcement');
const { Apprenticeship } = require('../../models/Apprenticeship'); 
const verifyToken = require('../../utils/verifyToken');
const addAnnouncement = async (req, res) => {
    if(!verifyToken(req)) return res.status(401).send({ message: 'Unauthorized', success: false });
    if(req.user.id !== parseInt(req.body.Owner_ID)) return res.status(401).send({ message: 'Unauthorized', success: false });
    const { Apprenticeship_ID, Subject, Content, Date_Of_Creation , Owner_ID } = req.body;
    try {
        const apprenticeship = await Apprenticeship.findByPk(Apprenticeship_ID);
        if(!apprenticeship) return res.status(404).send({ message: 'Apprenticeship not found', success: false });
        if(parseInt(apprenticeship.Owner_ID) !== parseInt(Owner_ID)) return res.status(401).send({ message: 'Unauthorized', success: false });
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
