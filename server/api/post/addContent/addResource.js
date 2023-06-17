const { Apprenticeship, ApprenticeshipResources } = require('../../../models/Apprenticeship');
const verifyToken = require('../../../utils/verifyToken');
const addResource = async (req, res) => {
    if (!verifyToken(req)) return res.status(401).send({ message: 'Unauthorized' });
    try {
        const { Name, Apprenticeship_ID, Type } = req.body;
        const apprenticeship = await Apprenticeship.findByPk(Apprenticeship_ID);
        if (apprenticeship) {
            if (apprenticeship.Owner_ID !== req.user.id) return res.status(401).send({ message: 'Unauthorized' });
            let { path } = req.file
            path = path.replace('public\\', '');
            const apprenticeshipResource = await ApprenticeshipResources.create({
                Apprenticeship_ID,
                Name,
                Resource: path,
                Type
            });
            res.status(200).send({ success: true });
        } else {
            res.status(404).send({ message: 'Apprenticeship not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    }
}

module.exports = addResource;