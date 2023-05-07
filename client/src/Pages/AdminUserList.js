import { useNavigate } from "react-router-dom";

function AdminUserList({isAdmin}){
    const navigate = useNavigate();
    if(!isAdmin){
        navigate('/pageNotFound');
    }
    return(
        <div>
            <h1>Admin User List</h1>
        </div>
    )
}

export default AdminUserList;