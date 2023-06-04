const {ApprenticeshipApprentice, Apprenticeship} = require('../../models/Apprenticeship');
const verifyToken = require('../../utils/verifyToken');

const rejectEnrollRequest = async (req, res) => {
    if (!verifyToken(req)) return res.status(401).json({error: 'Unauthorized'});
    const {id, appID} = req.params;
    if (!id) return res.status(400).json({error: 'Bad request'});
    try {
        const apprenticeship = await Apprenticeship.findOne({where: {ID: appID}});
        if (!apprenticeship) return res.status(404).json({error: 'Apprenticeship Not found'});
        if (apprenticeship.Owner_ID !== req.user.id) return res.status(401).json({error: 'Unauthorized'});
        const apprenticeshipApprentice = await ApprenticeshipApprentice.update({Rejected: 1}, {where: {ID: id}});
        res.json({message: 'Enroll request rejected successfully', success: true});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error});
    }
}

module.exports = rejectEnrollRequest;