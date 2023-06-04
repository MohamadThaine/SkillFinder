const Address = require('../../models/Address');
const verifyToken = require('../../utils/verifyToken');
const AddAddress = async (req, res) => {
    if(!verifyToken(req)) return res.status(401).json({ message: 'Unauthorized' });
    const addressData = req.body;
    if(req.user.id !== addressData.Owner_ID) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const address = await Address.create(addressData);
        res.status(200).json(address);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = AddAddress;