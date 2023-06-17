const Announcement = require('../../models/Announcement');
const { ApprenticeshipApprentice, Apprenticeship } = require('../../models/Apprenticeship');
const verifyToken = require('../../utils/verifyToken');
const getAnnouncements = async (req, res) => {
    if(!req.params.id) return res.status(400).json({ error: 'Missing required parameter: id' });
    if(!verifyToken(req)) return res.status(401).json({ error: 'Invalid or missing token' });
    try {
        const apprenticeshipApprentice = await ApprenticeshipApprentice.findOne({
            where: {
                Apprenticeship_ID: req.params.id,
                Apperntice_ID: req.user.id
            }
        });
        const apprenticeship = await Apprenticeship.findByPk(req.params.id);
        if(!apprenticeshipApprentice && req.user.id !== apprenticeship.Owner_ID) return res.status(403).json({ error: 'You are not enrolled in this apprenticeship' });
        const announcements = await Announcement.findAll({
            where: {
                Apprenticeship_ID: req.params.id
            },
            order: [
                ['Date_Of_Creation', 'DESC']
            ]
        });
        res.status(200).json(announcements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = getAnnouncements;