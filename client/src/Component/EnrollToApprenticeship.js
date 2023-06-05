import { Modal, Box, Typography, Button, Alert, Dialog, DialogContent, DialogContentText } from "@mui/material"
import { useState } from "react";
import { Link } from "react-router-dom";
import RequestLogin from "./RequestLogin";

const EnrollToApprenticeship = ({ open, handleClose, appID, owner, setSnackBarInfo, setStudent }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [description, setDescription] = useState('');
    if (user === null) return <RequestLogin open={open} handleClose={handleClose} setSnackBarInfo={setSnackBarInfo} />
    if (user.id === owner.id) return (
        <Dialog open={open} onClose={handleClose} style={{ padding: '10px' }}>
            <DialogContentText>
                <Typography variant="h5" className="mt-3 mb-3 ms-3 me-3">You can't enroll to your own apprenticeship!</Typography>
            </DialogContentText>
        </Dialog>
    );
    if (user.User_Type === 2) return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContentText>
                <Typography variant="h6" className="mt-3 mb-3 ms-3 me-3">You can't enroll to apprenticeship as an apprenticeship owner!</Typography>
            </DialogContentText>
        </Dialog>
    );
    const enrollToApprenticeship = async () => {
        if(description === '') return setSnackBarInfo({ open: true, message: 'Please enter a description!', severity: 'error' });
        const enrollRequest = {
            Apperntice_ID: user.id,
            Apprenticeship_ID: appID,
            Date: new Date(),
            Request_Description: description,
            isApproved: false
        }
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/sendEnrollRequest`, {
            method: "POST",
            headers: {
                authorization: localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(enrollRequest)
        }).then(res => res.json()).then(res => {
            if (res.success) {
                setSnackBarInfo({ open: true, message: res.message, severity: 'success' });
                setStudent({Apperntice_ID: user.id, isApproved: 0})
                handleClose();
            } else {
                setSnackBarInfo({ open: true, message: 'There was an error please try later!', severity: 'error' });
            }
        }).catch(err => {
            setSnackBarInfo({ open: true, message: err.error, severity: 'error' });
        });
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className='center-modal text-center' sx={{ background: 'white' }}>
                <Typography variant="h5" className="mt-3 mb-3">Enroll to {owner.name} apprenticeship?</Typography>
                <textarea className="form-control mt-3 mb-3" placeholder="Write a message to the owner..." rows="5" value={description} onChange={e => setDescription(e.target.value)} />
                <Button variant="contained" color="primary" onClick={enrollToApprenticeship}>Enroll</Button>
                <Button variant="contained" color="error" className="ms-3" onClick={handleClose}>Cancel</Button>
            </Box>
        </Modal>
    )
}

export default EnrollToApprenticeship;
