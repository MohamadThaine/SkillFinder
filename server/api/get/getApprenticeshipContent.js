const { ApprenticeshipApprentice, ApprenticeshipResources, Apprenticeship, FreeTrial } = require('../../models/Apprenticeship');
const verifyToken = require('../../utils/verifyToken');
const getApprenticeshipContent = async (req, res) => {
    if (!verifyToken(req)) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const apprenticeship = await Apprenticeship.findByPk(req.params.id);
        const checkStudent = await ApprenticeshipApprentice.findAll({
            where:
            {
                Apprenticeship_ID: req.params.id,
                Apperntice_ID: req.user.id
            },
        });
        const checkFreeTrial = await FreeTrial.findAll({
            where:
            {
                Apprenticeship_ID: req.params.id,
                Apprentice_ID: req.user.id
            },
        });
        if (checkStudent.length === 0 && apprenticeship.Owner_ID !== req.user.id && checkFreeTrial.length === 0) return res.status(401).json({ message: 'Unauthorized' });
        const freeTrailStudent = checkStudent.length === 0 && checkFreeTrial.length !== 0;
        const apprenticeshipResources = await ApprenticeshipResources.findAll({
            where:[
                { Apprenticeship_ID: req.params.id },
                { FreeTrailAvailable: freeTrailStudent? 1 : [0,1]}
            ],
            order: [
                ['Date_Of_Creation', 'ASC']
            ]
        });

        const proccessedResources = apprenticeshipResources.map(resource => {
            if (resource.Type === 'video' || resource.Type === 'file' || resource.Type === 'picture') {
                resource.Resource = `${req.protocol}://${req.get('host')}/${resource.Resource}`;
            }
            return resource;
        });
        return res.json({ proccessedResources, success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message, success: false });
    }
}

module.exports = getApprenticeshipContent;