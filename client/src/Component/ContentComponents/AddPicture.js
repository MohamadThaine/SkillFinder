import { Box, Checkbox, Modal } from '@mui/material';
import React, { useState } from 'react';

const AddPicture = ({ open, handleClose, setSnackBarInfo, appID, submitResource, freeTrail }) => {
    const [picture, setPicture] = useState(null);
    const [pictureName, setPictureName] = useState('');
    const [freeTrailAvailable, setFreeTrailAvailable] = useState(false);
    const verifyInput = () => {
        if (picture === null) {
            setSnackBarInfo({ severity: 'error', message: 'Please select picture', open });
            return false;
        }
        if (pictureName === '') {
            setSnackBarInfo({ severity: 'error', message: 'Please enter picture name', open });
            return false;
        }
        const isPicture = picture.type.split('/')[0] === 'image';
        if (!isPicture) {
            setSnackBarInfo({ severity: 'error', message: 'Please select a picture', open });
            return false;
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!verifyInput()) return;
        const data = new FormData();
        data.append('resource', picture, picture.name);
        data.append('Name', pictureName);
        data.append('Apprenticeship_ID', appID);
        data.append('Type', 'picture');
        data.append('FreeTrailAvailable', freeTrailAvailable);
        submitResource(data, 'Picture', handleClose);
    }


    return (
        <Modal open={open} onClose={handleClose}>
            <Box className='center-modal text-center add-content' sx={{ background: 'white' }}>
                <h5>Add Picture</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="picture" className="form-label">Picture</label>
                        <input type="file" className="form-control" id="picture" accept="image/*" onChange={e => setPicture(e.target.files[0])} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pictureName" className="form-label">Picture Description</label>
                        <input type="text" className="form-control" id="pictureName" onChange={e => setPictureName(e.target.value)} />
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

export default AddPicture;
