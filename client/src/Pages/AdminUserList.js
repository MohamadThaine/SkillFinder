import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AdminTable from "../Component/AdminTable";

function AdminUserList({isAdmin}){
    const navigate = useNavigate();
    if(!isAdmin){
        navigate('/pageNotFound');
    }

    const columns = [
        { id: 'ID', label: 'ID', minWidth: 50, align: 'center' },
        { id: 'Name', label: 'Name', minWidth: 50, align: 'center'},
        { id: 'Delete', label: 'Delete', minWidth: 50, align: 'center' },
        { id: 'Edit', label: 'Edit', minWidth: 50, align: 'center'},
    ];

    const [userList, setUserList] = useState([{ID: 1, Name: 'test'}, {ID: 2, Name: 'test2',}, { ID: 3, Name: 'test3'}, {ID: 4, Name: 'test4'}]);
    const [buttons, setButtons] = useState([{text: 'Delete', color: 'error', onClick: (e, id) => {console.log(id)}}, {text: 'Edit', color: 'primary', onClick: (e, id) => {console.log(id)}}]);
    return(
        <div className="container mt-auto mb-auto">
            <h1>Admin User List</h1>
            <input type="text" placeholder="Search" className="form-control mt-3 mb-3"/>
            <AdminTable columns={columns} data={userList} rowButtons={buttons} onRowClick={() => alert('hi')}/>
        </div>
    )
}

export default AdminUserList;