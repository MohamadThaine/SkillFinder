import { Box, List, Modal, ListItem, ListItemText } from "@mui/material"
import '../Assets/Styles/Announcements.css'
import { useEffect, useState } from "react";
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
    return (
        <ListItem className="border-bottom" sx={{ cursor: 'pointer' }} onClick={() => setOpenedAnnouncement(announcement)}>
            <ListItemText
                primary={announcement.Subject}
                secondary={`${announcement.Content.slice(0, 100)} ${announcement.Content.length > 100 ? '...' : ''} `} />
        </ListItem>
    );
}

const OpenedAnnouncement = ({ announcement, setOpenedAnnouncement }) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 320 512" style={{cursor: 'pointer'}} className="go-back-icon-annoucment"
                onClick={() => setOpenedAnnouncement(null)}>
                <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 
                    0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
            <h3 className="text-center p-3">{announcement.Subject}</h3>
            <p className="p-3">{announcement.Content}</p>
        </>
    );
}


export default Announcements;