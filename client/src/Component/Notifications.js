import React, { useEffect, useState, useRef } from 'react';
import Badge from '@mui/material/Badge';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import { IconButton } from '@mui/material';
import '../Assets/Styles/Notifications.css';
import UserNotification from './NotifcationComponents/UserNotification';
import OwnerNotifaction from './NotifcationComponents/OwnerNotifaction';

const Notifications = ({ socket }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const popupRef = useRef(null);
    const notifactionRef = useRef(null);
    useEffect(() => {
        if (user.User_Type === 1) {
            getStudentNotifications();
        }
        else if(user.User_Type === 2) {
            getOwnerNotifications();
        }
    }, [user]);

    const getStudentNotifications = async () => {
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/getStudentNotifications/${user.id}`, {
            method: 'GET',
            headers: {
                authorization: localStorage.getItem('token')
            },
        }).then(res => res.json()).then(data => {
            console.log(data);
            if (data.notifications) {
                setNotifications(data.notifications);
            }
        }).catch(err => {
            console.log(err);
            console.log(err);
        });
    }

    const getOwnerNotifications = async () => {
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/enrollRequests/all/${user.id}/0`, {
            method: 'GET',
            headers: {
                authorization: localStorage.getItem('token'),
            }
        }).then(response => response.json())
        .then(data => {
            setNotifications(data);
        });
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    const handleClickOutside = (event) => {
        const isInsideModal = event.target.closest('.center-modal'); 
        if (notifactionRef.current && !notifactionRef.current.contains(event.target) && !isInsideModal) {
            setShowNotifications(false);
        }
    }

    return (
        <div className="notifications" ref={notifactionRef}>
            <IconButton className='notifications__icon' aria-label="show notifications" color="inherit" onClick={() => setShowNotifications(!showNotifications)}>
                <Badge>
                    <NotificationsActiveOutlinedIcon />
                </Badge>
            </IconButton>
            {showNotifications && notifications.length === 0 && <div className="notifications-popup desc">
                <div className="notifications__popup__header border-bottom mt-1 mb-3">
                    <h5 className='text-center'>Notifications</h5>
                </div>
                <div className="notifications__popup__body">
                    <p className='text-center'>No Notifications</p>
                </div>
            </div>}
            {showNotifications && notifications.length > 0 && <div className="notifications-popup desc" ref={popupRef}>
                <div className="notifications__popup__header border-bottom mt-1 mb-3">
                    <h5 className='text-center'>Notifications</h5>
                </div>
                <div className="notifications__popup__body">
                    {user.User_Type === 1 && notifications.map((notification, index) => {
                        return <UserNotification key={index} notification={notification} setShowNotifactions={setShowNotifications} />
                    })}
                    {user.User_Type === 2 && notifications.map((notification, index) => {
                        return <OwnerNotifaction key={index} notifaction={notification} setNotifactionList={setNotifications} />
                    })}
                </div>
            </div>}
        </div>
    );
}



export default Notifications;