const { Apprenticeship } = require('../../models/Apprenticeship');
const { Owner } = require('../../models/User');

const approveApprenticeship = async (req, res) => {
    try {
        const apprenticeship = await Apprenticeship.findOne({
        where: {
            ID: req.params.id,
        },});
    
        if (!apprenticeship) {
        return res.status(404).json({ error: 'Apprenticeship not found' });
        }
    
        await apprenticeship.update({
        isApproved: true,
        });
    
        res.json(apprenticeship);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const approveOwner = async (req, res) => {
    try{
        const owner = await Owner.findOne({
            where: {
                User_ID: req.params.id,
            },});
            if(!owner){
                return res.status(404).json({error: 'Owner not found'});
            }
            await owner.update({
                isApproved: true,
            });
            res.json(owner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {approveApprenticeship, approveOwner};