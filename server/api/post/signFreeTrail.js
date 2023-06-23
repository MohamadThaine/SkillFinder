const { FreeTrial } = require('../../models/Apprenticeship');

const signFreeTrial = async (req, res) => {
    const { Apprenticeship_ID, Apprentice_ID, Duration } = req.body;
    try {
        const freeTrial = await FreeTrial.create({
            Apprenticeship_ID,
            Apprentice_ID,
            Start_Date: new Date(),
            End_Date: new Date(new Date().getTime() + Duration * 24 * 60 * 60 * 1000)
        });
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ error });
    }
}

module.exports = signFreeTrial;