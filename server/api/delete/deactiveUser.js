const {User} = require('../../models/User');
const verifyToken = require('../../utils/verifyToken');


const deactiveUser = async (req, res) => {
    const {id} = req.params;
    try{
        if(!verifyToken(req)) return res.status(401).json({ error: 'Unauthorized' });
        if(!req.user.isAdmin) return res.status(401).json({ error: 'Unauthorized' });
        const deleteUser = await User.findByPk(id);
        if(!deleteUser) return res.status(404).json({ error: 'User not found' });
        deleteUser.update({ Deactivated: true });
        return res.status(200).json({ message: 'User deleted successfully' });
    }catch(err){
        return res.status(500).json({ error: err.message });
    }
}

module.exports = deactiveUser;