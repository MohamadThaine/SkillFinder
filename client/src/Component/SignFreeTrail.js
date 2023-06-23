import { Alert, Box, Button, Modal, Dialog , DialogActions, Typography, DialogContent, DialogContentText } from "@mui/material"
import { useState } from "react";
import RequestLogin from "./RequestLogin";

const SignFreeTrail = ({open, handleClose, setSnackBarInfo , app, owner, freeTrailStudent}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    if (user === null) return <RequestLogin open={open} handleClose={handleClose} setSnackBarInfo={setSnackBarInfo} />
    if (user.id === owner.id) return (
        <Dialog open={open} onClose={handleClose} style={{ padding: '10px' }}>
            <DialogContentText>
                <Typography variant="h5" className="p-2">You can't request free trial to your own apprenticeship!</Typography>
            </DialogContentText>
        </Dialog>
    );
    if (user.User_Type === 2) return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContentText>
                <Typography variant="h5" className="p-2">You can't request free trial to apprenticeship as an apprenticeship owner!</Typography>
            </DialogContentText>
        </Dialog>
    );

    if (freeTrailStudent) return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContentText className="p-2">
                <h5 className="mt-auto mb-auto">You have already requested free trial to this apprenticeship!</h5>
            </DialogContentText>
        </Dialog>
    );

    const handleSendRequest = async () => {
        const data = {
            Apprenticeship_ID: app.ID,
            Apprentice_ID: user.id,
            Duration: app.freeTrailDuration
        }
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/signFreeTrial/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(res => res.json()).then(data => {
            if (data.success) {
                setSnackBarInfo({ severity: 'success', message: 'Request sent successfully', open: true });
                handleClose();
            } else {
                setSnackBarInfo({ severity: 'error', message: 'Request failed', open: true });
            }
        }).catch(err => {
            setSnackBarInfo({ severity: 'error', message: 'Request failed', open: true });
        })
    }
    return (
        <Modal open={open} onClose={handleClose}>
            <Box className='center-modal text-center' sx={{ background: 'white' }}>
                <h3>Sign up for a free trial</h3>
                <p>Get access to resources chosen by the owner for {app.freeTrailDuration} days</p>
                <Button variant='contained' onClick={handleSendRequest}>Sign Up</Button>
                <Button variant='outlined' className="ms-3" onClick={handleClose}>Cancel</Button>
                <Alert severity='info' className="mt-3">You can only request a free trial once</Alert>
            </Box>
        </Modal>
    )
}

export default SignFreeTrail