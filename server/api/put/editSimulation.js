const Simulation = require('../../models/Simulation');
const verifyToken = require('../../utils/verifyToken');

const editSimulation = async (req, res) => {
    try{
        if (!verifyToken(req)) return res.status(401).json({ message: 'Unauthorized' });
        if (!req.user.isAdmin) return res.status(401).json({ message: 'Unauthorized' });
        const { id } = req.params;
        const { Name, Path } = req.body;
        const editSimulation = await Simulation.update({ Name, Path }, { where: { Category_ID: id } });
        if(editSimulation === null) return res.status(500).json({ message: 'Something went wrong' });
        res.status(200).json({ message: 'Simulation edited successfully', success: true });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: 'Something went wrong', success: false });
    }
}

module.exports = editSimulation;