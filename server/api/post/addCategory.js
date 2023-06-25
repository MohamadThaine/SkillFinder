const Category = require('../../models/Category');
const verifyToken = require('../../utils/verifyToken');
const addCategory = (req, res) => {
    if(!verifyToken(req)) return res.status(401).json({ error: 'Unauthorized' });
    if(!req.user.isAdmin) return res.status(401).json({ error: 'Unauthorized' });
    const {name} = req.body;
    Category.create({
        Name: name,
    }).then(category => {
        res.send({category: category});
    }).catch(err => {
        res.send({error: err.message});
    });
}

module.exports = addCategory;