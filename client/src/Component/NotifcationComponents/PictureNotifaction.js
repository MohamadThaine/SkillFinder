import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import { useNavigate } from "react-router-dom";

const PictureNotifcation = ({ notification, timeStamp, setShowNotifcations }) => {
    const navigate = useNavigate();
    return (
        <div className="notification d-flex border-bottom" onClick={() => {
            navigate(`/Apprenticeship/${notification.Apprenticeship_ID}`)
            setShowNotifcations(false)
        }}>
            <div className="mt-auto mb-auto border p-2" style={{borderRadius: '90px'}}>
                <CollectionsOutlinedIcon />
            </div>
            <div>
                <h5 className="ms-3 mt-auto mb-auto">{notification.Name}</h5>
                <h5 className="ms-3 mt-auto mb-auto">Has been added to {notification.apprenticeshipName}</h5>
            </div>
            <small className="ms-auto me-3 mt-auto mb-auto">{timeStamp} ago</small>
        </div>
    )
}

export default PictureNotifcation;
