const  Category  = require("../../models/Category");
const verifyToken = require("../../utils/verifyToken");
const editCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        if(!verifyToken(req)) return res.status(401).json({error: 'Unauthorized'});
        if(!req.user.isAdmin) return res.status(403).json({error: 'Unauthorized'});
        if(!name) return res.status(400).json({error: 'Name is required!'});
        const category = await Category.findByPk(id);
        if(!category) return res.status(404).json({error: 'Category not found!'});
        category.Name = name;
        await category.save();
        res.json({message: 'Category updated successfully!'});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

module.exports = editCategory;