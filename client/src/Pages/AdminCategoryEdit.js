import { Button } from "@mui/material";
import AdminTable from "../Component/AdminTable";
import { useEffect, useState } from "react";
function AdminCategoryEdit(){
    const columns = [
        { id: 'Name', label: 'Name', minWidth: 50 , align: 'center' },
        { id: 'apprenticeshipCount', label: 'Number of Apprenticeships', minWidth: 50, align: 'center'},
        { id: 'ID', label: 'ID', minWidth: 50, align: 'center' },
        { id: 'Delete', label: 'Delete', minWidth: 50, align: 'center' },
        { id: 'Edit', label: 'Edit', minWidth: 50, align: 'center'},
        
    ];
    const [categoryList, setCategoryList] = useState([{Name: 'test', ID: 1, Number:20}, {Name: 'test2', ID: 2, Number:20}, {Name: 'test3', ID: 3, Number:20}, {Name: 'test4', ID: 4, Number:20}]);
    const [buttons, setButtons] = useState([{text: 'Delete', color: 'error', onClick: (e, id) => {console.log(id)}}, {text: 'Edit', color: 'primary', onClick: (e, id) => {console.log(id)}}]);

    useEffect(() => {
        fetch('http://localhost:5000/categories')
        .then(res => res.json())
        .then(data => {
            setCategoryList(data);
        }).catch(err => console.log(err));
    }, [])

    return(
        <div className="container mt-auto mb-auto">
            <div className="row">
                <Button variant="contained" color="primary" className="col-3 ms-auto me-3"> + Add Category</Button>
            </div>
            <input type="text" placeholder="Search" className="form-control mt-3 mb-3"/>
            <AdminTable columns={columns} data={categoryList} rowButtons={buttons} onRowClick={() => alert('hi')}/>
        </div> 
    )
}

export default AdminCategoryEdit;