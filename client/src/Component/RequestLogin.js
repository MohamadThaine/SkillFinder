import React from 'react';
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogContentText, Button, Typography } from '@mui/material';

const RequestLogin = ({ open, handleClose, setSnackBarInfo }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContentText>
                <Typography variant="h5" className="mt-3 mb-3 ms-3 me-3">You need to login to use this feature</Typography>
            </DialogContentText>
            <DialogContent className="text-center">
                <Link to="/Login">
                    <Button variant="contained" color="primary" onClick={() => setSnackBarInfo({ open: true, message: 'Login to continue', severity: 'info' })}>Login</Button>
                </Link>
                <Link to="/Register" className="ms-3">
                    <Button variant="contained" color="warning" onClick={() => setSnackBarInfo({ open: true, message: 'Register as apprentice', severity: 'info' })}>Register</Button>
                </Link>
                <Button variant="contained" color="error" className="ms-3" onClick={handleClose}>Cancel</Button>
            </DialogContent>
        </Dialog>
    );
}

export default RequestLogin;