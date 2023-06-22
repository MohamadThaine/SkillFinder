import React from "react";
import { useNavigate } from "react-router-dom";


const VideoNotifaction = ({ notification, timeStamp, setShowNotifcations }) => {
    const navigate = useNavigate();
    return (
        <div className="notification d-flex border-bottom" onClick={() => {
            navigate(`/Apprenticeship/${notification.Apprenticeship_ID}`)
            setShowNotifcations(false)
        }}>
            <div className="mt-auto mb-auto border p-2" style={{ borderRadius: '90px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" fill="currentColor" className="bi bi-film" viewBox="0 0 16 16">
                    <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z" />
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

export default VideoNotifaction;