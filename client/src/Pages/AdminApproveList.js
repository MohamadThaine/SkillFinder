import { useNavigate } from "react-router-dom";

function AdminApproveList({isAdmin}){
    const navigate = useNavigate();
    if(!isAdmin){
        navigate('/pageNotFound');
    }
    return(
        <div className="container mt-auto mb-auto">
            <h1>Admin Approve List</h1>
        </div>
    )
}

export default AdminApproveList;