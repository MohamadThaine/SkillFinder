const Category = require('../../models/Category');
const Simulation = require('../../models/Simulation');
const verifyToken = require('../../utils/verifyToken');

const addSimulation = async (req, res) => {
    try{
        if (!verifyToken(req)) return res.status(401).json({ message: 'Unauthorized' });
        if (!req.user.isAdmin) return res.status(401).json({ message: 'Unauthorized' });
        const { Name, Path, Category_ID } = req.body;
        if (!req.user.isAdmin) return res.status(401).json({ message: 'Unauthorized' });
        const newSimulation = await Simulation.create({
            Name,
            Path,
            Category_ID,
        });
        const editCategory = await Category.update({ AvailableSimulation: true }, { where: { ID: Category_ID} });
        if(newSimulation === null || editCategory === null) return res.status(500).json({ message: 'Something went wrong' });
        res.status(200).json({ message: 'Simulation added successfully', success: true, ID: newSimulation.ID });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: 'Something went wrong', success: false });
    }
}

module.exports = addSimulation;
