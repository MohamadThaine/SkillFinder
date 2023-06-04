const { User } = require('../../models/User');
const  verifyToken  = require('../../utils/verifyToken');
const bcryptjs = require('bcryptjs');

const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if(!oldPassword || !newPassword) return res.send({ error: 'Missing required fields' });
    if(!verifyToken(req)) return res.status(401).json({ error: 'Unauthorized' });
    if(req.user.id !== parseInt(req.params.id)) return res.status(401).json({ error: 'Unauthorized' });
    try {
        const user = await User.findByPk(req.params.id);
        if(!user) return res.status(404).json({ error: 'User not found' });
        if(!bcryptjs.compareSync(oldPassword, user.Password)) return res.send({ error: 'Wrong password' });
        if(oldPassword === newPassword) return res.send({ error: 'New password must be different from old password' });
        const passwordHash = bcryptjs.hashSync(newPassword, 10);
        await user.update({ Password: passwordHash });
        res.send({ message: 'Password changed successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
};

module.exports = updateUserPassword;