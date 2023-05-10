import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminTable from "../Component/AdminTable";

function AdminUserList({isAdmin}){
    const navigate = useNavigate();
    if(!isAdmin){
        navigate('/pageNotFound');
    }

    const columns = [
        { id: 'id', label: 'ID', minWidth: 50, align: 'center' },
        { id: 'Name', label: 'Name', minWidth: 50, align: 'center'},
        { id: 'Type', label: 'Type', minWidth: 50, align: 'center' },
        { id: 'Deactive', label: 'Edit', minWidth: 50, align: 'center'},
    ];

    const [userList, setUserList] = useState([]);
    const [buttons, setButtons] = useState([{text: 'Deactive', color: 'error', onClick: (e, id) => {console.log(id)}}]);

    useEffect(() => {
        fetch('http://localhost:5000/users/true', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              authorization: localStorage.getItem('token'),
            },
          })
          .then(res => res.json())
          .then(data => {
            const userList = data.map(user => {
              return {
                ...user,
                Type: user.User_Type === 2 ? 'Owner' : 'Apprentice',
              };
            });
            setUserList(userList);
          })
          .catch(err => console.log(err));
      }, []);      

    return(
        <div className="container mt-auto mb-auto">
            <h1>Admin User List</h1>
            <input type="text" placeholder="Search" className="form-control mt-3 mb-3"/>
            <AdminTable columns={columns} data={userList} rowButtons={buttons} onRowClick={() => alert('hi')}/>
        </div>
    )
}

export default AdminUserList;