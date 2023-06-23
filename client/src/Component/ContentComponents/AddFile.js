import { Alert, Box, Checkbox, Modal } from '@mui/material';
import React, {useState} from 'react';

const AddFile = ({open, handleClose, setSnackBarInfo, appID, submitResource, freeTrail}) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [freeTrailAvailable, setFreeTrailAvailable] = useState(false);
    const verifyInput = () => {
        if (file === null) {
            setSnackBarInfo({severity: 'error', message: 'Please select file', open});
            return false;
        }
        const fileSize = file.size / 1024 / 1024;
        if (fileSize > 1024) {
            setSnackBarInfo({severity: 'error', message: 'File size must be less than 1GB', open});
            return false;
        }
        if (fileName === '') {
            setSnackBarInfo({severity: 'error', message: 'Please enter file name', open});
            return false;
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!verifyInput()) return;
        const data = new FormData();
        data.append('resource', file, file.name);
        data.append('Name', fileName);
        data.append('Apprenticeship_ID', appID);
        data.append('Type', 'file');
        data.append('FreeTrailAvailable', freeTrailAvailable);
        submitResource(data, 'File', handleClose);
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className='center-modal text-center add-content' sx={{background: 'white'}}>
                <h5>Add File</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="file" className="form-label">File</label>
                        <input type="file" className="form-control" id="file" onChange={e => setFile(e.target.files[0])} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fileName" className="form-label">File Name</label>
                        <input type="text" className="form-control" id="fileName" onChange={e => setFileName(e.target.value)} />
                    </div>
                    {freeTrail != 0 && <Checkbox color="primary" id='freeTrail' onChange={e => setFreeTrailAvailable(e.target.checked)} />}
                    {freeTrail != 0 && <label htmlFor="freeTrail" className="form-label">Free Trail Available</label>}
                    <Alert severity="info">Maxmimum File Size is 1GB</Alert>
                    <button type="submit" className="btn btn-primary mt-3" onSubmit={handleSubmit}>Submit</button>
                    <button type="button" className="btn btn-secondary ms-2 mt-3" onClick={handleClose}>Cancel</button>
                </form>
            </Box>
        </Modal>
    )
}

export default AddFile;
