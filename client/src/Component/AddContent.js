import { CircularProgress, Fab, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import addIcon from '../Assets/Images/plus-solid-white.svg';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined';
import { useState } from 'react';
import AddLink from './ContentComponents/AddLink';
import AddVideo from './ContentComponents/AddVideo';
import AddAnnoucment from './AddAnnoucment';
import AddPicture from './ContentComponents/AddPicture';
import AddFile from './ContentComponents/AddFile';
import AddText from './ContentComponents/AddText';

const AddContent = ({ setSnackBarInfo, appID, appName, setResourceList, socket, enrolledStudents }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openAddAnnouncement, setOpenAddAnnouncement] = useState(false);
    const [openAddLink, setOpenAddLink] = useState(false);
    const [openAddVideo, setOpenAddVideo] = useState(false);
    const [openAddPicture, setOpenAddPicture] = useState(false);
    const [openAddFile, setOpenAddFile] = useState(false);
    const [openAddText, setOpenAddText] = useState(false);
    const [isUplaoding, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSubmitResource = (data, type, handleClose) => {
        setIsUploading(true);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/addResource`);
        xhr.setRequestHeader('authorization', localStorage.getItem('token'));
        xhr.setRequestHeader('foldername', appID);
        handleClose();
        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                const progress = Math.round((event.loaded / event.total) * 100);
                setProgress(progress);

            }
        });
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        setSnackBarInfo({ severity: 'success', message: `${type} added successfully`, open: true });
                        setIsUploading(false);
                        setResourceList(prevState => {
                            const date = response.data.Date_Of_Creation.split('T')[0];
                            return {
                                ...prevState,
                                [date]: [...(prevState[date] || []), response.data]
                            };
                        });
                        socket.current.emit('sendResource', appID, response.data, enrolledStudents );
                    } else {
                        setSnackBarInfo({ severity: 'error', message: `Failed to add ${type}`, open: true });
                    }
                } else {
                    setSnackBarInfo({ severity: 'error', message: `Failed to add ${type}`, open: true });
                }
            }
        };
        xhr.send(data);
    }

    return (
        <div className='add-content-app'>
            <Fab className='add-content-btn' onClick={handleOpen}>
                <img src={addIcon} />
            </Fab>
            <Menu open={open} onClose={handleClose} className='add-content-menu' anchorEl={anchorEl}>
                <MenuItem onClick={() => {
                    setOpenAddAnnouncement(true);
                    handleClose();
                }}>
                    <ListItemIcon>
                        <CampaignOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Announcement" />
                </MenuItem>
                <MenuItem onClick={() => {
                    setOpenAddLink(true);
                    handleClose();
                }}>
                    <ListItemIcon>
                        <InsertLinkOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Link" />
                </MenuItem>
                <MenuItem onClick={() => {
                    if (isUplaoding) return setSnackBarInfo({ severity: 'error', message: 'Please wait for the current upload to finish', open: true });
                    setOpenAddVideo(true);
                    handleClose();
                }}>
                    <ListItemIcon>
                        <VideocamOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Video" />
                </MenuItem>
                <MenuItem onClick={() => {
                    if (isUplaoding) return setSnackBarInfo({ severity: 'error', message: 'Please wait for the current upload to finish', open: true });
                    setOpenAddPicture(true);
                    handleClose();
                }}>
                    <ListItemIcon>
                        <CollectionsOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Picture" />
                </MenuItem>
                <MenuItem onClick={() => {
                    if (isUplaoding) return setSnackBarInfo({ severity: 'error', message: 'Please wait for the current upload to finish', open: true });
                    setOpenAddFile(true);
                    handleClose();
                }}>
                    <ListItemIcon>
                        <DriveFileMoveOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="File" />
                </MenuItem>
                <MenuItem onClick={() => {
                    setOpenAddText(true);
                    handleClose();
                }}>
                    <ListItemIcon>
                        <TextFieldsOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Text" />
                </MenuItem>
            </Menu>
            {openAddAnnouncement && <AddAnnoucment open={openAddAnnouncement} handleClose={() => setOpenAddAnnouncement(false)} setSnackBarInfo={setSnackBarInfo}
                appID={appID} appName={appName} />}
            {openAddLink && <AddLink open={openAddLink} handleClose={() => setOpenAddLink(false)} setSnackBarInfo={setSnackBarInfo} appID={appID} setResourceList={setResourceList} socket={socket} enrolledStudents={enrolledStudents} />}
            {openAddVideo && <AddVideo open={openAddVideo} handleClose={() => setOpenAddVideo(false)} setSnackBarInfo={setSnackBarInfo} appID={appID}
                submitResource={handleSubmitResource} />}
            {openAddPicture && <AddPicture open={openAddPicture} handleClose={() => setOpenAddPicture(false)} setSnackBarInfo={setSnackBarInfo} appID={appID}
                submitResource={handleSubmitResource} />}
            {openAddFile && <AddFile open={openAddFile} handleClose={() => setOpenAddFile(false)} setSnackBarInfo={setSnackBarInfo} appID={appID}
                submitResource={handleSubmitResource} />}
            {openAddText && <AddText open={openAddText} handleClose={() => setOpenAddText(false)} setSnackBarInfo={setSnackBarInfo} appID={appID} setResourceList={setResourceList} socket={socket} enrolledStudents={enrolledStudents} />}
            {isUplaoding && <CircularProgress
                variant='determinate' className='ms-3' value={progress} style={{ background: 'lightGray', borderRadius: '90px', width: '5rem', height: '5rem' }} />}
        </div>
    )
}

export default AddContent;
