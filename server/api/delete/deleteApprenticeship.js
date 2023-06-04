const { Apprenticeship } = require('../../models/Apprenticeship');
const verifyToken = require('../../utils/verifyToken');

const deleteApprenticeship = async (req, res) => {
    if(!verifyToken(req)) return res.status(401).json({ error: 'Unauthorized' });
    try {
        const apprenticeship = await Apprenticeship.findByPk(req.params.id);
        if (!apprenticeship) return res.status(404).json({ error: 'Apprenticeship not found' });
        if(!req.user.isAdmin && req.user.id !== apprenticeship.Owner_ID) return res.status(401).json({ error: 'Unauthorized' });
        apprenticeship.update({ Deactivated: true });  
        res.json({ message: 'Apprenticeship deleted successfully', success: true, ID: apprenticeship.ID });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

module.exports = deleteApprenticeship;