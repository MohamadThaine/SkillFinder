import { Alert, Box, Modal, Snackbar } from '@mui/material';
import React, { useState } from 'react';

const ContactApprentice = ({ open, handleClose, user, setSnackBarInfo, closeReivew }) => {
    const [message, setMessage] = useState('');
    const [owner, setOwner] = useState(JSON.parse(localStorage.getItem('user')));
    const verifyData = () => {
        if (!message) {
            setSnackBarInfo({ severity: 'error', message: 'Please enter your message', open: true });
            return false;
        }
        return true;
    }

    const handleSendMessage = async () => {
        if (!verifyData()) return;
        const data = {
            Owner_ID: owner.id,
            Apprentice_ID: user.ID,
            Message_Text: message,
            isOwner: true
        }
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/createChat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (result.success) {
            handleClose();
            if(closeReivew) closeReivew();
            setSnackBarInfo({ severity: 'success', message: 'Message sent successfully', open: true });
        }
        else return setSnackBarInfo({ severity: 'error', message: result.message, open: true });
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className='center-modal text-center' sx={{ background: 'white' }}>
                <h3 className="text-center">Contact {user.Name}</h3>
                <textarea className="form-control mt-3" placeholder="Enter your message here..." rows="5" onChange={e => setMessage(e.target.value)}></textarea>
                <button className="btn btn-primary mt-3" onClick={handleSendMessage}>Send</button>
                <button className="btn btn-danger mt-3 ms-3" onClick={handleClose}>Cancel</button>
            </Box>
        </Modal>
    )
}

export default ContactApprentice