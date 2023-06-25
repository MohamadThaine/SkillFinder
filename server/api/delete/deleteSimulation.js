const Simulation = require('../../models/Simulation');
const Category = require('../../models/Category');
const verifyToken = require('../../utils/verifyToken');

const deleteSimulation = async (req, res) => {
    try{
        if (!verifyToken(req)) return res.status(401).json({ message: 'Unauthorized' });
        if (!req.user.isAdmin) return res.status(401).json({ message: 'Unauthorized' });
        const { id } = req.params;
        const simulation = await Simulation.findOne({ where: { Category_ID: id } });
        if(simulation === null) return res.status(500).json({ message: 'Something went wrong' });
        simulation.destroy();
        const category = await Category.update({ AvailableSimulation: false }, { where: { ID: id } });
        if(category === null) return res.status(500).json({ message: 'Something went wrong' });
        res.status(200).json({ message: 'Simulation deleted successfully', success: true });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: 'Something went wrong', success: false });
    }
}

module.exports = deleteSimulation;