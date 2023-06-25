const Category = require("../../models/Category");
const Simulation = require("../../models/Simulation");
const { Apprenticeship } = require("../../models/Apprenticeship");
const verifyToken = require("../../utils/verifyToken");
const deleteCatogry = async (req, res) => {
    const { id } = req.params;
    try {
        if(!verifyToken(req)) return res.status(401).json({error: 'Unauthorized'});
        if(!req.user.isAdmin) return res.status(403).json({error: 'Unauthorized'});
        const category = await Category.findByPk(id);
        if(!category) return res.status(404).json({error: 'Category not found!'});
        const apprenticeships = await Apprenticeship.findAll({
            where: {
                Category_ID: id,
            },
        });
        apprenticeships.map((apprenticeship) => {
            apprenticeship.Category_ID = 3;
            apprenticeship.save();
        });
        const simulations = await Simulation.findByPk(id);
        if(simulations) await simulations.destroy();
        await category.destroy();
        res.json({message: 'Category deleted successfully!'});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

module.exports = deleteCatogry;