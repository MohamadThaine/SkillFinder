import { Alert, Box, Modal } from '@mui/material';
import React, {useEffect, useState} from 'react';

const AddVideo = ({open, handleClose, setSnackBarInfo, appID, submitResource}) => {
    const [video, setVideo] = useState(null);
    const [videoName, setVideoName] = useState('');

    const verifyInput = () => {
        if (video === null) {
            setSnackBarInfo({severity: 'error', message: 'Please select video', open});
            return false;
        }
        if (videoName === '') {
            setSnackBarInfo({severity: 'error', message: 'Please enter video name', open});
            return false;
        }
        const videoSize = video.size / 1024 / 1024;
        if (videoSize > 1024) {
            setSnackBarInfo({severity: 'error', message: 'Video size must be less than 1GB', open});
            return false;
        }
        const isVideo = video.type.split('/')[0] === 'video';
        if (!isVideo) {
            setSnackBarInfo({severity: 'error', message: 'Please select a video file', open});
            return false;
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!verifyInput()) return;
        const data = new FormData();
        data.append('resource', video, video.name);
        data.append('Name', videoName);
        data.append('Apprenticeship_ID', appID);
        data.append('Type', 'video');
        submitResource(data, 'Video', handleClose);
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className='center-modal text-center add-content' sx={{background: 'white'}}>
                <h5>Add Video</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="video" className="form-label">Video</label>
                        <input type="file" className="form-control" id="video" accept="video/*" onChange={e => setVideo(e.target.files[0])} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="videoName" className="form-label">Video Name</label>
                        <input type="text" className="form-control" id="videoName" onChange={e => setVideoName(e.target.value)} />
                    </div>
                    <Alert severity="info">Maxmimum Video Size is 1GB</Alert>
                    <button type="submit" className="btn btn-primary mt-3" onClick={handleSubmit}>Submit</button>
                    <button type="button" className="btn btn-secondary ms-2 mt-3" onClick={handleClose}>Cancel</button>
                </form>
            </Box>
        </Modal>
    )
}

export default AddVideo;
