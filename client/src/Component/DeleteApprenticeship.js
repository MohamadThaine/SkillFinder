import React from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

const DeleteApprenticeship = ({ open, handleClose, apprenticeship, setAppList, setSnackBarInfo, setIsDeleting }) => {
    const deleteApprenticeship = async () => {
        const res = await fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/deleteApprenticeship/${apprenticeship.ID}`, {
            method: "DELETE",
            headers: {
                authorization: localStorage.getItem("token")
            }
        });
        const parseRes = await res.json();
        if (parseRes.success) {
            handleClose();
            setIsDeleting(true);
            setTimeout(() => {
                setAppList(appList => appList.filter(app => app.ID !== apprenticeship.ID));
                setSnackBarInfo({ severity: "success", message: "Apprenticeship deleted successfully!", open: true });
                setIsDeleting(false);
            }, 1000);
        } else {
            setSnackBarInfo({ severity: "error", message: "Error deleting apprenticeship!", open: true });
        }
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Are you sure you want to delete {apprenticeship.Name}?</DialogTitle>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={deleteApprenticeship} color="primary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteApprenticeship;