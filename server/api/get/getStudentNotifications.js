const { Apprenticeship, ApprenticeshipApprentice, ApprenticeshipResources } = require('../../models/Apprenticeship');
const Announcement = require('../../models/Announcement');
const verifyToken = require('../../utils/verifyToken');
const { Op, literal } = require('sequelize');

const getStudentNotifications = async (req, res) => {
    const { id } = req.params;
    const todayData = new Date();
    const lastMonthData = new Date(todayData.getFullYear(), todayData.getMonth() - 1, todayData.getDate());
    if (!verifyToken(req)) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const apprenticeships = await ApprenticeshipApprentice.findAll({
            where: {
                Apperntice_ID: id
            },
            include: [
                {
                    model: Apprenticeship,
                    include: [
                        {
                            model: ApprenticeshipResources,
                            where: {
                                Date_Of_Creation: {
                                    [Op.between]: [lastMonthData, todayData]
                                }
                            }
                        },
                        {
                            model: Announcement,
                            where: {
                                Date_Of_Creation: {
                                    [Op.between]: [lastMonthData, todayData]
                                }
                            }
                        }
                    ],
                }
            ],
        });
        const proccedNotifications = [];
        apprenticeships.forEach(apprenticeship => {
            const { Apprenticeship } = apprenticeship;
            if( !Apprenticeship ) return;
            const { apprenticeship_resources, announcements, Name } = Apprenticeship;
            if (apprenticeship_resources) {
                const apprenticeshipResources = apprenticeship_resources.map(resource => {
                    return {
                        ...resource.toJSON(),
                        apprenticeshipName: Name
                    };
                });
                proccedNotifications.push(apprenticeshipResources);
            }
            if (!announcements) return;
            const apprenticeshipAnnouncements = announcements.map(announcement => {
                return {
                    ...announcement.toJSON(),
                    apprenticeshipName: Name
                };
            });
            proccedNotifications.push(apprenticeshipAnnouncements);
        });
        const notifications = proccedNotifications.flat().sort((a, b) => {
            return new Date(b.Date_Of_Creation) - new Date(a.Date_Of_Creation);
        });;
        return res.status(200).json({ notifications });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
module.exports = getStudentNotifications;