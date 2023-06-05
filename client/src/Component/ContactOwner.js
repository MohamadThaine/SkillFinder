import { Alert, Box, Button, Modal, Snackbar, TextareaAutosize, Typography } from "@mui/material";
import RequestLogin from "./RequestLogin";
import { useState } from "react";
import '../Assets/Styles/ContactOwner.css'

const ContactOwner = ({ open, handleClose, owner, setSnackBarInfo }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [message, setMessage] = useState('');

    if (!user) return <RequestLogin open={true} handleClose={handleClose} setSnackBarInfo={setSnackBarInfo} />

    if(owner.id === user.id) return <>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert severity="error">You can't contact yourself!</Alert>
        </Snackbar>
    </>

    if(user.User_Type === 2) return <>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert severity="error">You can't contact an owner as owner!</Alert>
        </Snackbar>
    </>

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className='center-modal text-center' sx={{ background: 'white' }}>
                <h4>Contact Owner</h4>
                <div className="contact-owner-info">
                    <img src={owner.picture} alt="profile" />
                    <h5>{owner.name}</h5>
                </div>
                <TextareaAutosize value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Message' className="contact-owner-message-container" />
                <div className="row">
                    <Button variant="contained" className="col ms-4 me-4">
                        Send
                    </Button>
                    <Button variant="contained" className="col ms-4 me-4" color="error" onClick={handleClose}>
                        Cancel
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}

export default ContactOwner;