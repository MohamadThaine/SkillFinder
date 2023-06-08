const {Owner, User, Apprentice} = require('../../models/User');
const verifyToken = require('../../utils/verifyToken');
const updateUserData = async (req, res) => {
    const {id} = req.params;
    const {user, otherInfo} = req.body;
    if(!verifyToken(req)) return res.status(401).json({error: 'Unauthorized'});
    if(user.id !== req.user.id) return res.status(401).json({error: 'Unauthorized'});
    try{
        const userToUpdate = await User.findOne({where: {id}});
        if(!userToUpdate) return res.status(404).json({error: 'User not found'});
        if(userToUpdate.id !== user.id) return res.status(401).json({error: 'Unauthorized'});
        const updatedUser = await userToUpdate.update(user);
        if(!updatedUser) return res.status(500).json({error: 'Internal server error'});
        if(userToUpdate.User_Type === 2)
        {
            const ownerToUpdate = await Owner.findByPk(userToUpdate.id);
            if(!ownerToUpdate) return res.status(404).json({error: 'Owner not found'});
            const updatedOwner = await ownerToUpdate.update({Major: otherInfo});
            if(!updatedOwner) return res.status(500).json({error: 'Internal server error'});
        }
        else{
            const apprenticeToUpdate = await Apprentice.findByPk(userToUpdate.id);
            if(!apprenticeToUpdate) return res.status(404).json({error: 'Apprentice not found'});
            const updatedApprentice = await apprenticeToUpdate.update({Study_Level: otherInfo});
            if(!updatedApprentice) return res.status(500).json({error: 'Internal server error'});
        }
        return res.status(200).json({message: 'User updated successfully'});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: err.message});
    }
}

module.exports = updateUserData;
