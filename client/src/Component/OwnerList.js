import { Box, Button, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItemButton, ListItemText, ListSubheader, Modal, Rating, Typography } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useEffect, useState } from "react";
import EditApprenticeship from "./EditApprenticeship";
import DeleteApprenticeship from "./DeleteApprenticeship";
import '../Assets/Styles/DeleteApprenticeship.css';
import ContactApprentice from "./ContactApprentice";
import StudentTable from "./StudentTable";
const OwnerList = ({ title, list, setList, listType, setSnackBarInfo, headerClassName, listOpen, setListOpen, listClassName, windowWidth }) => {
    return (
        <List className={listClassName}
            sx={{ width: '100%', maxWidth: 600 }}
            component="nav"
            subheader={
                <ListSubheader component="div" className="list-sub-header card">
                    <ListItemButton className={headerClassName} onClick={() => setListOpen(!listOpen)} sx={{ padding: '0' }}>
                        <div className="list-text">
                            <Typography variant="h5" className="ms-2">{title}</Typography>
                            <Typography variant="h6" className="ms-2">Total: {!list.length ? '0' : list.length}</Typography>
                        </div>
                        {listOpen ? <ExpandLess className="ms-auto me-3" /> : <ExpandMore className="ms-auto me-3" />}
                    </ListItemButton>
                </ListSubheader>
            }
        >
            <Collapse in={listOpen} timeout="auto" unmountOnExit className="border pb-3">
                {listType === 'app' && list.length > 0 && list.map((app, index) => <OwnerApprenticeship key={index} app={app} setSnackBarInfo={setSnackBarInfo} setAppList={setList} />)}
                {listType === 'review' && list.length > 0 && list.map((review, index) => <Review key={index} review={review} windowWidth={windowWidth} setSnackBarInfo={setSnackBarInfo} />)}
                {listType === 'request' && list.length > 0 && list.map((request, index) => <Request key={index} request={request} setSnackBarInfo={setSnackBarInfo} setRequestList={setList} />)}
            </Collapse>
        </List>
    )
}

const OwnerApprenticeship = ({ app, setSnackBarInfo, setAppList }) => {
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [studentTableOpen, setStudentTableOpen] = useState(false);
    useEffect(() => {
        if (isDeleting) {
            open && setOpen(false);
        }
    }, [isDeleting]);

    return (
        <>
            {app !== null && <ListItemButton onClick={() => setOpen(!open)} className={"me-2 ms-2 mt-3 app-owner-home border-bottom " + (isDeleting ? 'is-deleting' : '')}>
                <ListItemText primary={app.Name} sx={{ width: '25%'}} />
                <ListItemText primary={"Student: " + app.enrolledStudentsCount} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>}
            {app !== null && <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding className="text-center mt-2 mb-2">
                    <Button variant="contained" color="success" className="mt-1" onClick={() => {
                        window.open('/Apprenticeship/' + app.ID, "_blank");
                    }}>View</Button>
                    <Button variant="contained" color="warning" className="ms-3 mt-1" onClick={() => setStudentTableOpen(true)}>View Students</Button>
                    <Button variant="contained" className="ms-3 mt-1" onClick={() => setEditOpen(true)}>Edit</Button>
                    <Button variant="contained" color="error" className="ms-3 mt-1" onClick={() => setDeleteOpen(true)}>Delete</Button>
                </List>
            </Collapse>}
            {app !== null && editOpen && <EditApprenticeship open={editOpen} handleClose={() => setEditOpen(false)} setSnackBarInfo={setSnackBarInfo} setApprenticeshipList={setAppList} apprenticeship={app} />}
            {app !== null && deleteOpen && <DeleteApprenticeship open={deleteOpen} handleClose={() => setDeleteOpen(false)} apprenticeship={app} setAppList={setAppList} setSnackBarInfo={setSnackBarInfo} setIsDeleting={setIsDeleting} />}
            {app !== null && studentTableOpen && <StudentTable open={studentTableOpen} handleClose={() => setStudentTableOpen(false)} appID={app.ID} />}
        </>
    )
}

const Review = ({ review, windowWidth, setSnackBarInfo }) => {
    const [openReview, setOpenReview] = useState(false);
    return (
        <>
            {review !== null && <ListItemButton className="me-2 ms-2 mt-3 app-owner-home border-bottom" onClick={() => setOpenReview(true)}>
                <ListItemText primary={
                    windowWidth < 768 ? `${review.apprentice.User.Name.split(' ')[0]}..` : review.apprentice.User.Name
                } />
                <ListItemText primary={
                    windowWidth < 768 ? `${review.Apprenticeship.Name.split(' ')[0]}..` : review.Apprenticeship.Name
                } className="ms-1 me-1" />
                <Rating name="read-only" value={review.Rating_Value} readOnly className="ms-auto" precision={0.5} />
                <ListItemText primary={review.Rating_Value} className="ms-1" />
            </ListItemButton>
            }
            {openReview && <OpenedReview review={review} open={openReview} handleClose={() => setOpenReview(false)} setSnackBarInfo={setSnackBarInfo} />}
        </>
    )
}

const OpenedReview = ({ review, open, handleClose, setSnackBarInfo }) => {
    const [openSendMessage, setOpenSendMessage] = useState(false);
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Review</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {review.Content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenSendMessage(true)}>Send A Message</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
            {openSendMessage && <ContactApprentice open={openSendMessage} handleClose={() => setOpenSendMessage(false)} user={review.apprentice.User} setSnackBarInfo={setSnackBarInfo} closeReivew={handleClose} />}
        </>
    )
}


const Request = ({ request, setSnackBarInfo, setRequestList }) => {
    const [showDescription, setShowDescription] = useState(false)
    const [open, setOpen] = useState(false);
    const [openSendMessage, setOpenSendMessage] = useState(false);
    const [user, setUser] = useState({
        ID: request.Apperntice_ID,
        Name: request.Name,
    });
    const acceptRequest = () => {
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/acceptRequest/${request.ID}/${request.Apprenticeship_ID}`, {
            method: 'PUT',
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(res => res.json()).then(data => {
            if (data.success) {
                setSnackBarInfo({ severity: 'success', message: 'Request Accepted', open: true });
                setOpen(false);
                setRequestList(prev => prev.filter(req => req.ID !== request.ID));
            } else {
                setSnackBarInfo({ severity: 'error', message: 'Error accepting the request', open: true });
            }
        }).catch(err => {
            setSnackBarInfo({ severity: 'error', message: err.error, open: true });
        })
    }

    const rejectRequest = () => {
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/rejectRequest/${request.ID}/${request.Apprenticeship_ID}`, {
            method: 'PUT',
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(res => res.json()).then(data => {
            if (data.success) {
                setSnackBarInfo({ severity: 'success', message: 'Request Rejected', open: true });
                setOpen(false);
                setRequestList(prev => prev.filter(req => req.ID !== request.ID));
            } else {
                setSnackBarInfo({ severity: 'error', message: 'Error rejecting the request', open: true });
            }
        }).catch(err => {
            setSnackBarInfo({ severity: 'error', message: err.error, open: true });
        })
    }


    return (
        <>
            {request !== null && <ListItemButton className="me-2 ms-2 mt-3 app-owner-home border-bottom" onClick={() => setOpen(!open)}>
                <ListItemText primary={request.Name} />
                <ListItemText primary={request.ApprenticeshipName} className="ms-1 me-1" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>}
            {request && <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding className="text-center mt-2 mb-2">
                    <Button variant="contained" color="primary" className="mt-1 me-3" onClick={() => {
                        setShowDescription(true)
                    }}>View Description</Button>
                    <Button variant="contained" color="success" className="mt-1" onClick={acceptRequest}>Accept</Button>
                    <Button variant="contained" color="error" className="ms-3 mt-1" onClick={rejectRequest}>Reject</Button>
                    <Button variant="contained" className="ms-3 mt-1" color="warning" onClick={() => setOpenSendMessage(true)}>Send A Message</Button>
                </List>
            </Collapse>}
            {request && showDescription && <RequestDescription description={request.Request_Description} open={showDescription} handleClose={() => setShowDescription(false)} />}
            {openSendMessage && <ContactApprentice open={openSendMessage} handleClose={() => setOpenSendMessage(false)} user={user} setSnackBarInfo={setSnackBarInfo} />}
        </>
    )
}

const RequestDescription = ({ description, open, handleClose }) => {
    return (
        <>
            {description !== null &&
                <Modal open={open} onClose={handleClose}>
                    <Box className='center-modal' sx={{ background: 'white' }}>
                        <Typography variant="h4" className="mt-3 mb-3">Description</Typography>
                        <Typography variant="h6" className="mt-3 mb-3">{description}</Typography>
                    </Box>
                </Modal>
            }
        </>
    )
}

export default OwnerList;
