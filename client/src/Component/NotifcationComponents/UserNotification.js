import { Box, Modal } from "@mui/material"
import FileNotifcation from "./FileNotifaction"
import LinkNotifaction from "./LinkNotifaction"
import PictureNotifcation from "./PictureNotifaction"
import TextNotifaction from "./TextNotifaction"
import VideoNotifaction from "./VideoNotifaction"
import { useState } from "react"
import HtmlContent from "../HtmlContent"

const UserNotification = ({ notification, setShowNotifactions }) => {
    const getTimestamp = () => {
        const currentDate = new Date();
        const notificationDate = new Date(notification.Date_Of_Creation);
        const timeDiff = currentDate.getTime() - notificationDate.getTime();
        let duration;
        if (timeDiff < 1000 * 60) {
            const secondsDiff = Math.floor(timeDiff / 1000);
            duration = `${secondsDiff} second${secondsDiff !== 1 ? 's' : ''}`;
        } else if (timeDiff < 1000 * 60 * 60) {
            const minutesDiff = Math.floor(timeDiff / (1000 * 60));
            duration = `${minutesDiff} minute${minutesDiff !== 1 ? 's' : ''}`;
        } else if (timeDiff < 24 * 60 * 60 * 1000) {
            const hoursDiff = Math.floor(timeDiff / (1000 * 3600));
            duration = `${hoursDiff} hour${hoursDiff !== 1 ? 's' : ''}`;
        } else if (timeDiff < 7 * 24 * 60 * 60 * 1000) {
            const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
            duration = `${daysDiff} day${daysDiff !== 1 ? 's' : ''}`;
        } else {
            const weeksDiff = Math.floor(timeDiff / (1000 * 3600 * 24 * 7));
            duration = `${weeksDiff} week${weeksDiff !== 1 ? 's' : ''}`;
        }
        return duration;
    }
    const [timeStamp, setTimeStamp] = useState(getTimestamp());
    if (notification.Type)
        return <ResourceNotification notification={notification} timeStamp={timeStamp} setShowNotifactions={setShowNotifactions} />
    else
        return <AnnouncementNotification notification={notification} timeStamp={timeStamp} setShowNotifactions={setShowNotifactions} />
}

const ResourceNotification = ({ notification, timeStamp, setShowNotifactions }) => {
    if (notification.Type === 'video')
        return <VideoNotifaction notification={notification} timeStamp={timeStamp} setShowNotifcations={setShowNotifactions} />
    else if (notification.Type === 'link')
        return <LinkNotifaction notification={notification} timeStamp={timeStamp} setShowNotifcations={setShowNotifactions} />
    else if (notification.Type === 'text')
        return <TextNotifaction notification={notification} timeStamp={timeStamp} setShowNotifcations={setShowNotifactions} />
    else if (notification.Type === 'picture')
        return <PictureNotifcation notification={notification} timeStamp={timeStamp} setShowNotifcations={setShowNotifactions} />
    else
        return <FileNotifcation notification={notification} timeStamp={timeStamp} setShowNotifcations={setShowNotifactions} />
}

const AnnouncementNotification = ({ notification, timeStamp, setShowNotifactions }) => {
    const [opened, setOpened] = useState(false);
    return (
        <div className="notification border-bottom d-flex align-items-center" onClick={() => setOpened(true)}>
            <div className="mb-1 border p-2" style={{ borderRadius: '90px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" fill="currentColor" className="bi bi-megaphone-fill" viewBox="0 0 16 16">
                    <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-11zm-1 .724c-2.067.95-4.539 1.481-7 1.656v6.237a25.222 25.222 0 0 1 1.088.085c2.053.204 4.038.668 5.912 1.56V3.224zm-8 7.841V4.934c-.68.027-1.399.043-2.008.053A2.02 2.02 0 0 0 0 7v2c0 1.106.896 1.996 1.994 2.009a68.14 68.14 0 0 1 .496.008 64 64 0 0 1 1.51.048zm1.39 1.081c.285.021.569.047.85.078l.253 1.69a1 1 0 0 1-.983 1.187h-.548a1 1 0 0 1-.916-.599l-1.314-2.48a65.81 65.81 0 0 1 1.692.064c.327.017.65.037.966.06z" />
                </svg>
            </div>
            <h5 className="ms-3 mb-1">{notification.apprenticeshipName} has a new announcement</h5>
            <small className="ms-auto me-3">{timeStamp} ago</small>
            {opened && <OpenedAnnouncement notification={notification} open={opened} handleClose={() => setOpened(false)} setShowNotifactions={setShowNotifactions} />}
        </div>
    )
}

const OpenedAnnouncement = ({notification, open, handleClose, setShowNotifactions}) => {
    return (
        <Modal open={open} onClose={() => {
            handleClose();
            setShowNotifactions(false);
        }}>
            <Box className="center-modal" sx={{ background: 'white' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="close-announ bi bi-x" viewBox="0 0 16 16" onClick={() => {
                    handleClose();
                    setShowNotifactions(false);
                }}>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
                <h3 className="text-center p-3">{notification.Subject}</h3>
                <div className="ms-3">
                    <HtmlContent htmlContent={notification.Content} />
                </div>
            </Box>
        </Modal>
    )
}


export default UserNotification;