import { Button } from "@mui/material";
import userIcon from '../Assets/Images/user-solid-white.svg';
import approveIcon from '../Assets/Images/check-solid-white.svg';
import addIcon from '../Assets/Images/plus-solid-white.svg';
import schoolIcom from '../Assets/Images/school-solid-white.svg';
import '../Assets/Styles/AdminHome.css';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function AdminHome({isAdmin}){
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!isAdmin)
        {
            navigate('/PageNotFound');
        }
    }, [isAdmin, navigate])
    
        

    return(
        <div className="container mt-auto mb-auto d-flex justify-content-center">
            <div className="text-center admin-buttons-row">
                <Button variant="contained" onClick={() => navigate('/Admin/User')}>
                    <img src={userIcon} alt="user" className="admin-nav-bar-icons"/>
                    Users
                </Button>
                <Button variant="contained" onClick={() => navigate('/Admin/Apprenticeship')}>
                    <img src={schoolIcom} alt="user" className="admin-nav-bar-icons"/>
                    Apprenticeship
                </Button>
            </div>
            <div className="text-center admin-buttons-row">
                <Button variant="contained" onClick={() => navigate('/Admin/Approve')}>
                    <img src={approveIcon} alt="user" className="admin-nav-bar-icons"/>
                    Approve
                </Button>
                <Button variant="contained" onClick={() => navigate('/Admin/Edit')}>
                    <img src={addIcon} alt="user" className="admin-nav-bar-icons"/>
                    Edit Categories
                </Button>
            </div>
        </div>
    )
}

export default AdminHome;