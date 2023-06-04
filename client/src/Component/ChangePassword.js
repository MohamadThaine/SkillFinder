import { Box, Modal } from "@mui/material";
import { useState } from "react";

const ChangePassowrd = ({ open, handleClose, setSnackBarInfo, windowWidth, user }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(newPassword.length < 8) return setSnackBarInfo({ severity: 'error', message: 'Password must contain at least 8 characters', open: true });
        if(newPassword !== confirmPassword) return setSnackBarInfo({ severity: 'error', message: 'Passwords do not match', open: true });
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/updateUserPassword/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token')
            },
            body: JSON.stringify({ oldPassword, newPassword })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) return setSnackBarInfo({ severity: 'error', message: data.error, open: true });
            setSnackBarInfo({ severity: 'success', message: data.message, open: true });
            handleClose();
        })
        .catch(err => {
            console.log(err);
            setSnackBarInfo({ severity: 'error', message: err.error, open: true });
        });
    };



    return (
        <Modal open={open} onClose={handleClose}>
            <Box className='center-modal' sx={{ background: 'white' }}>
                <h4 className="text-center">Change Password</h4>
                <form>
                    <div className="form-group">
                        <label htmlFor="oldPassword">Old Password</label>
                        <input type="password" className="form-control mb-1" id="oldPassword" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <input type="password" className="form-control mb-1" id="newPassword" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" className="form-control mt-1" id="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                    <div className="form-group text-center m-auto">
                        <button type="submit" className="btn btn-primary mt-3" onClick={handleSubmit}>Change Password</button>
                        <button type="button" className={"btn btn-danger mt-3 " + (windowWidth > 990? 'ms-3': '')} onClick={handleClose}>Cancel</button>
                    </div>
                </form>
            </Box>
        </Modal>
    )
}

export default ChangePassowrd;