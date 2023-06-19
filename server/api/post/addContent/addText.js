const { Apprenticeship, ApprenticeshipResources } = require('../../../models/Apprenticeship');
const verifyToken = require('../../../utils/verifyToken');
const addText = async (req, res) => {
    if (!verifyToken(req)) return res.status(401).send({ message: 'Unauthorized' });
    try {
        const { Name, Content, Apprenticeship_ID } = req.body;
        const apprenticeship = await Apprenticeship.findByPk(Apprenticeship_ID);
        if (apprenticeship) {
            console.log(apprenticeship.Owner_ID, req.user.id);
            if (apprenticeship.Owner_ID !== req.user.id) return res.status(401).send({ message: 'Unauthorized' });
            if(!apprenticeship.isApproved) return res.status(401).send({ message: 'Cant add content to non approved apprenticeship' });
            const apprenticeshipResource = await ApprenticeshipResources.create({
                Apprenticeship_ID,
                Name,
                Resource: Content,
                Type: 'text'
            });
            res.status(200).send({ success: true, apprenticeshipResource });
        } else {
            res.status(404).send({ message: 'Apprenticeship not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    }
}

module.exports = addText;
