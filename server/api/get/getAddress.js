const Address = require('../../models/Address');

const getAddress = async (req, res) => {
    try {
        const address = await Address.findAll({ where: { Owner_ID: req.params.id } });
        res.status(200).json(address);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = getAddress;