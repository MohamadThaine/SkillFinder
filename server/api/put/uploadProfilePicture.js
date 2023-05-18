const { Owner } = require("../../models/User");
const verifyToken = require("../../utils/verifyToken");

const uploadPicture = async (req, res) => {
    if(!verifyToken(req)) return;
    if(req.user.id != req.params.ID) return;
    const { ID } = req.params;
    let { path } = req.file
    path = path.replace('public\\', '');
    try {
        const owner = await Owner.findOne({ where: { User_ID: ID } });
        if (owner) {
            await Owner.update({ Picture: path }, { where: { User_ID: ID } });
            res.json({ path });
        }
        else {
            res.json({ message: 'Upload Failed!' });
        }
    } catch (e) {
        res.json({ message: e.message });
    }
}



module.exports = uploadPicture;