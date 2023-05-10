const {Owner, User} = require('../../models/User');
const verifyToken = require('../../utils/verifyToken');

const rejectOwner = async (req, res) => {
    try{
        if(!verifyToken(req)) return res.status(401).json({ error: 'Unauthorized' });
        if(req.user.isAdmin !== true) return res.status(401).json({ error: 'Unauthorized' });
        const owner = await Owner.destroy({
            where: {
                User_ID: req.params.id,
            },});
            if(!owner){
                return res.status(404).json({error: 'Owner not found'});
            }
            await owner.destroy();
            res.json({message: 'Owner deleted successfully'});
        const user = await User.destroy({
            where: {
                ID: req.params.id,
            },});
            if(!user){
                return res.status(404).json({error: 'User not found'});
            }
            await user.destroy();
            res.json({message: 'User deleted successfully'});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = rejectOwner;