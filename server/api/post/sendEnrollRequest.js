const { ApprenticeshipApprentice } = require('../../models/Apprenticeship');
const verifyToken = require('../../utils/verifyToken');

const sendEnrollRequest = async (req, res) => {
    if(!verifyToken(req)) return res.status(401).json({ error: 'Unauthorized' });
    const  enrollRequest  = req.body;
    if(!enrollRequest) return res.status(400).json({ error: 'Bad request' });
    if(req.user.id !== enrollRequest.Apperntice_ID) return res.status(401).json({ error: 'Unauthorized' });
    try {
        const apprenticeshipApprentice = await ApprenticeshipApprentice.create(enrollRequest);
        res.json({ message: 'Enroll request sent successfully', success: true});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
};

module.exports = sendEnrollRequest;