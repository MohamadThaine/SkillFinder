import { FileIcon, defaultStyles } from 'react-file-icon';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FileNotifcation = ({ notification, timeStamp, setShowNotifcations }) => {
    const [extension, setExtension] = useState(notification.Resource.split('.').pop());
    const navigate = useNavigate();
    return (
        <div className="notification d-flex border-bottom" onClick={() => {
            navigate(`/Apprenticeship/${notification.Apprenticeship_ID}`)
            setShowNotifcations(false)
        }}>
            <div className="mt-auto mb-auto border p-2 file-icon-notification" style={{ borderRadius: '90px' }}>
                <FileIcon extension={extension} {...defaultStyles[extension]} />
            </div>
            <div className='d-flex flex-column'>
                <h5 className="ms-3 mt-auto mb-auto">{notification.Name}</h5>
                <h5 className="ms-3 mt-auto mb-auto">Has been added to {notification.apprenticeshipName}</h5>
            </div>
            <small className="ms-auto me-3 mt-auto mb-auto">{timeStamp} ago</small>
        </div>
    )
}

export default FileNotifcation;
