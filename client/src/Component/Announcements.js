import { Box, List, Modal, ListItem, ListItemText } from "@mui/material"
import '../Assets/Styles/Announcements.css'
import { useEffect, useState } from "react";
import HtmlContent from "./HtmlContent";
import htmlToDraft from 'html-to-draftjs';
const Announcements = ({ app, open, handleClose }) => {
    const [openedAnnouncement, setOpenedAnnouncement] = useState(null);
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/getAnnouncements/${app.ID}`, {
            method: 'GET',
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(res => res.json())
            .then(data => {
                if (data.error) return console.log(data.error);
                setAnnouncements(data);
            }).catch(err => console.log(err));
    }, []);

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className='center-modal annoucments-modal' sx={{ background: 'white', padding: '0' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="close-announ bi bi-x" viewBox="0 0 16 16" onClick={handleClose}>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
                {openedAnnouncement === null && <>
                    <h3 className="text-center p-3">Announcements</h3>
                    <List className="annoucments-list">
                        {announcements.map(announcement => <Announcement key={announcement.ID} announcement={announcement} setOpenedAnnouncement={setOpenedAnnouncement} />)}
                    </List>
                </>}
                {openedAnnouncement !== null && <OpenedAnnouncement announcement={openedAnnouncement} setOpenedAnnouncement={setOpenedAnnouncement} />}
            </Box>
        </Modal>
    );
}

const Announcement = ({ announcement, setOpenedAnnouncement }) => {
    const [contentText, setContentText] = useState(htmlToDraft(announcement.Content).contentBlocks.map(block => block.text).join(' '));
    return (
        <ListItem className="border-bottom" sx={{ cursor: 'pointer' }} onClick={() => setOpenedAnnouncement(announcement)}>
            <ListItemText
                primary={announcement.Subject}
                secondary={`${contentText.slice(0, 100)} ${contentText.length > 100 ? '...' : ''} `} />
        </ListItem>
    );
}

const OpenedAnnouncement = ({ announcement, setOpenedAnnouncement }) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 320 512" style={{ cursor: 'pointer' }}
                onClick={() => setOpenedAnnouncement(null)}>
                <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 
                    0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
            <h3 className="text-center p-3">{announcement.Subject}</h3>
            <div className="ms-3">
                <HtmlContent htmlContent={announcement.Content} />
            </div>
        </>
    );
}


export default Announcements;