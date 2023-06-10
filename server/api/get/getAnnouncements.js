const Announcement = require('../../models/Announcement');
const { ApprenticeshipApprentice } = require('../../models/Apprenticeship');
const verifyToken = require('../../utils/verifyToken');
const getAnnouncements = async (req, res) => {
    if(!req.params.id) return res.status(400).json({ error: 'Missing required parameter: id' });
    if(!verifyToken(req)) return res.status(401).json({ error: 'Invalid or missing token' });
    try {
        console.log(req.params.id);
        console.log(req.user.id);
        const apprenticeshipApprentice = await ApprenticeshipApprentice.findOne({
            where: {
                Apprenticeship_ID: req.params.id,
                Apperntice_ID: req.user.id
            }
        });
        if(!apprenticeshipApprentice) return res.status(403).json({ error: 'You are not enrolled in this apprenticeship' });
        const announcements = await Announcement.findAll({
            where: {
                Apprenticeship_ID: req.params.id
            }
        });
        console.log(announcements);
        res.status(200).json(announcements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = getAnnouncements;