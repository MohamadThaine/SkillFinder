const Simulation = require('../../models/Simulation');
const Category = require('../../models/Category');
const verifyToken = require('../../utils/verifyToken');

const getSimulations = async (req, res) => {
    try{
        if (!verifyToken(req)) return res.status(401).json({ message: 'Unauthorized' });
        if (!req.user.isAdmin) return res.status(401).json({ message: 'Unauthorized' });
        const simulations = await Simulation.findAll({ include: Category });
        res.status(200).json(simulations);
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

module.exports = getSimulations;