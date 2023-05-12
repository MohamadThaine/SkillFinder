const Category = require('../../models/Category');

const addCategory = (req, res) => {
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