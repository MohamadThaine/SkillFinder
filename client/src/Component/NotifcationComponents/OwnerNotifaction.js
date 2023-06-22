import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import { Box, Modal } from '@mui/material';
import { useState } from 'react';

const OwnerNotifaction = ({ notifaction, setNotifactionList }) => {
    const getTimeDifference = (date) => {
        const currentDate = new Date();
        const notifactionDate = new Date(date);
        const diff = currentDate.getTime() - notifactionDate.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
        const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
        if (days > 0) {
            return `${days} days ago`;
        }
        else if (weeks > 0) {
            return `${weeks} weeks ago`;
        }
        else if (months > 0) {
            return `${months} months ago`;
        }
    }
    
    const [date, setDate] = useState(getTimeDifference(notifaction.Date));
    const [openNotifaction, setOpenNotifaction] = useState(false);
    return (
        <div>
            <div className="notification d-flex border-bottom" onClick={() => setOpenNotifaction(true)}>
                <div className="mt-auto mb-auto border p-2 mb-2" style={{ borderRadius: '90px' }}>
                    <PeopleOutlineOutlinedIcon />
                </div>
                <div className='mb-2'>
                    <h6 className="ms-3 mt-auto mb-auto">{notifaction.Name}</h6>
                    <h6 className="ms-3 mt-auto mb-auto">Has requested to join {notifaction.ApprenticeshipName}</h6>
                </div>
                <small className="ms-auto mt-auto mb-auto me-3">{date}</small>
            </div>
            {openNotifaction && <OpenNotifaction open={openNotifaction} handleClose={() => setOpenNotifaction(false)} notifaction={notifaction} setNotifactionList={setNotifactionList} />}
        </div>
    );
}


const OpenNotifaction = ({ open, handleClose, notifaction, setNotifactionList }) => {
    const acceptRequest = () => {
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/acceptRequest/${notifaction.ID}/${notifaction.Apprenticeship_ID}`, {
            method: 'PUT',
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(res => res.json()).then(data => {
            if (data.success) {
                setNotifactionList(prev => prev.filter(req => req.ID !== notifaction.ID));
                handleClose();
            }
        })
    }

    const rejectRequest = () => {
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/rejectRequest/${notifaction.ID}/${notifaction.Apprenticeship_ID}`, {
            method: 'PUT',
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(res => res.json()).then(data => {
            if (data.success) {
                setNotifactionList(prev => prev.filter(req => req.ID !== notifaction.ID));
                handleClose();
            }
        })
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className='center-modal' sx={{ backgroundColor: 'white' }}>
                <h6 className='text-center'>Request to join {notifaction.ApprenticeshipName}</h6>
                <h6 className='text-center mb-3'>{notifaction.Name}</h6>
                <h6>Request Description</h6>
                <h6 className='p-2 border'>{notifaction.Request_Description}</h6>
                <div className='d-flex mt-3'>
                    <button className='btn btn-success mx-auto' onClick={acceptRequest}>Accept</button>
                    <button className='btn btn-danger mx-auto' onClick={rejectRequest}>Decline</button>
                    <button className='btn btn-secondary mx-auto' onClick={handleClose}>Close</button>
                </div>
            </Box>
        </Modal>
    )
}

export default OwnerNotifaction;