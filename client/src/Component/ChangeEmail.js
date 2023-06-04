import { Box, Button, Modal, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import randomstring from 'randomstring';
import emailjs from '@emailjs/browser';

const ChangeEmail = ({ open, handleClose, setSnackBarInfo, email, setVerfired, setIsEditing, oldData, setUserCopy }) => {
    const [code, setCode] = useState(randomstring.generate(6));
    const [codeInput, setCodeInput] = useState('');

    useEffect(() => {
        const EmailJsTemplateParams = {
            to_name: oldData.Name,
            email: email,
            code: code
        }
        emailjs.send(process.env.React_APP_EmailJsServiceID, process.env.React_APP_EmailJsVerifyEmailTemplateID, EmailJsTemplateParams, process.env.React_APP_EmailJs_API_KEY);
    }, [])

    const handleVerify = () => {
        if (codeInput === code) {
            setVerfired(true);
            handleClose();
        }
        else {
            setSnackBarInfo({ severity: 'error', message: 'Wrong Code', open: true });
        }
    }

    const cancelVerify = () => {
        setVerfired(false);
        setUserCopy(oldData);
        setIsEditing(false);
        handleClose();
    }

    return (
        <Modal open={open} onClose={cancelVerify}>
            <Box className='center-modal text-center' sx={{ background: 'white' }}>
                <h4>Verify Email</h4>
                <p>An email has been sent to {email} with a verification code</p>
                <TextField label='Verification Code' variant='outlined' className='col-12 mb-3' value={codeInput} onChange={e => setCodeInput(e.target.value)} />
                <Button variant='contained' color='success' className='col-3 mb-3' onClick={handleVerify}>
                    Verify
                </Button>
                <Button variant='contained' color='error' className='col-3 ms-3 mb-3' onClick={cancelVerify}>
                    Cancel
                </Button>
            </Box>
        </Modal>
    )
}

export default ChangeEmail;