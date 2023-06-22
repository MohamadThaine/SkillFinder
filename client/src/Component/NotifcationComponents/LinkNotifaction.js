import React from "react";
import { useNavigate } from "react-router-dom";


const LinkNotifaction = ({ notification, timeStamp, setShowNotifcations }) => {
    const navigate = useNavigate();
    return (
        <div className="notification d-flex border-bottom" onClick={() => {
            navigate(`/Apprenticeship/${notification.Apprenticeship_ID}`)
            setShowNotifcations(false)
        }}>
            <div className="mt-auto mb-auto border p-2" style={{ borderRadius: '90px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" className="bi bi-link-45deg " viewBox="0 0 16 16">
                    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                </svg>
            </div>
            <div>
                <h5 className="ms-3 mt-auto mb-auto">{notification.Name}</h5>
                <h5 className="ms-3 mt-auto mb-auto">Has been added to {notification.apprenticeshipName}</h5>
            </div>
            <small className="ms-auto me-3 mt-auto mb-auto">{timeStamp} ago</small>
        </div>
    )
}

export default LinkNotifaction;