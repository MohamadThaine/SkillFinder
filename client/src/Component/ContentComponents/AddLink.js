import { Box, Checkbox, Modal } from '@mui/material';
import {useState} from 'react';

const AddLink = ({open, handleClose, setSnackBarInfo, appID, setResourceList, socket, enrolledStudents, freeTrail}) => {
    const [link, setLink] = useState('');
    const [linkName, setLinkName] = useState('');
    const [freeTrailAvailable, setFreeTrailAvailable] = useState(false);
    const verifyInput = () => {
        if (link === '') {
            setSnackBarInfo({ severity: 'error', message: 'Please enter link', open });
            return false;
        }
        const validLink = link.match(/^(ftp|http|https):\/\/[^ "]+$/);
        if (!validLink) {
            setSnackBarInfo({ severity: 'error', message: 'Please enter valid link', open });
            return false;
        }
        if (linkName === '') {
            setSnackBarInfo({ severity: 'error', message: 'Please enter link name', open });
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!verifyInput()) return;
        const data = {
            Name: linkName,
            Link: link,
            Apprenticeship_ID: appID,
            FreeTrailAvailable: freeTrailAvailable
        }
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/addLink`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token')
            },
            body: JSON.stringify(data),
        }).then(res => res.json()).then(data => {
            if (data.success) {
                setSnackBarInfo({ severity: 'success', message: 'Link added successfully', open });
                handleClose();
                setResourceList(prevState => {
                    const date = data.apprenticeshipResource.Date_Of_Creation.split('T')[0];
                    return {
                        ...prevState,
                        [date]: [...(prevState[date] || []), data.apprenticeshipResource]
                    };
                });
                console.log(enrolledStudents);
                socket.current.emit('sendResource', appID, data.apprenticeshipResource, enrolledStudents);
            } else {
                setSnackBarInfo({ severity: 'error', message: data.message, open });
            }
        }).catch(err => {
            console.log(err);
            setSnackBarInfo({ severity: 'error', message: 'Internal server error', open });
        });
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className='center-modal text-center add-content' sx={{background: 'white'}}>
                <h5>Add Link</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="link" className="form-label">Link</label>
                        <input type="url" className="form-control" id="link" onChange={e => setLink(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="linkName" className="form-label">Link Name</label>
                        <input type="text" className="form-control" id="linkName" onChange={e => setLinkName(e.target.value)} />
                    </div>
                    {freeTrail != 0 && <div>
                        <Checkbox color="primary" id='freeTrail' onChange={e => setFreeTrailAvailable(e.target.checked)} />
                        <label htmlFor="freeTrail" className="form-label">Free Trail Available</label>
                    </div>}
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    <button type="button" className="btn btn-secondary ms-2" onClick={handleClose}>Cancel</button>
                </form>
            </Box>
        </Modal>
    )
}

export default AddLink;
