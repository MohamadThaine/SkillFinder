import { Alert, Button } from "@mui/material";
import AdminTable from "../Component/AdminTable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Modal, Typography } from "@mui/material";
function AdminCategoryEdit({ isAdmin, setSnackBarInfo }) {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAdmin) navigate('/pageNotFound');
    }, []);
    const columns = [
        { id: 'Name', label: 'Name', minWidth: 50, align: 'center' },
        { id: 'apprenticeshipCount', label: 'Number of Apprenticeships', minWidth: 50, align: 'center' },
        { id: 'ID', label: 'ID', minWidth: 50, align: 'center' },
        { id: 'Delete', label: 'Delete', minWidth: 50, align: 'center' },
        { id: 'Edit', label: 'Edit', minWidth: 50, align: 'center' },

    ];
    const [categoryList, setCategoryList] = useState([])
    const [saveCategoryList, setSaveCategoryList] = useState([])
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCatogry] = useState(null);
    const [openAdd, setOpenAdd] = useState(false);
    const openModal = (row) => {
        setSelectedCatogry(row);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedCatogry(null);
        setOpen(false);
    };

    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setTimeout(() => {
            if (searchValue === '') {
                setCategoryList(saveCategoryList);
            }
            else {
                setCategoryList(categoryList.filter(category => {
                    return category.Name.toLowerCase().includes(searchValue) || category.ID.toString().includes(searchValue);
                }));
            }
        }
            , 500);
    }

    const deleteCategory = (e, Category) => {
        e.stopPropagation();
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/deleteCategory/${Category.ID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token'),
            },
        }).then(res => res.json())
            .then(data => {
                setCategoryList(prevCategoryList => prevCategoryList.filter(category => category.ID !== Category.ID));
                setSaveCategoryList(prevCategoryList => prevCategoryList.filter(category => category.ID !== Category.ID));
                setSnackBarInfo({ open: true, message: 'Category Deleted', severity: 'success' });
            }).catch(err => {
                setSnackBarInfo({ open: true, message: 'Error Deleting Category ' + err, severity: 'error' });
            });
    }


    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/categories`)
            .then(res => res.json())
            .then(data => {
                setCategoryList(data);
                setSaveCategoryList(data);
            }).catch(err => console.log(err));
    }, [])
    const [buttons, setButtons] = useState([{ text: 'Delete', color: 'error', onClick: deleteCategory }, { text: 'Edit', color: 'primary', onClick: openModal }]);

    return (
        <div className="container mt-auto mb-auto">
            <Typography variant="h4" className="text-center mb-3 mt-2 ps-2 pe-2">Edit Category</Typography>
            <div className="row">
                <Button variant="contained" color="primary" className="col-3 ms-auto me-3" onClick={() => setOpenAdd(true)}> + Add Category</Button>
            </div>
            <input type="text" placeholder="Search" className="form-control mt-3 mb-3" onChange={handleSearch} />
            <AdminTable columns={columns} data={categoryList} rowButtons={buttons} onRowClick={openModal} />
            <EditCategoryModal open={open} handleClose={handleClose} category={selectedCategory} deleteCategory={deleteCategory} />
            <AddCategoryModal open={openAdd} handleClose={() => setOpenAdd(false)} setCategoryList={setCategoryList} setSnackBarInfo={setSnackBarInfo} />
        </div>
    )
}

const EditCategoryModal = ({ category, open, handleClose, deleteCategory }) => {
    const modelStyle = {
        backgroundColor: 'white',
        width: '34%',
    }

    const [categoryName, setCategoryName] = useState('');
    const [message, setMessage] = useState({ message: 'Note: Editing a category will change the category of all apprenticeships in that category to the new category name.', severity: 'info' });
    useEffect(() => {
        if (category != null) setCategoryName(category.Name);
    }, [category])

    const editCategory = () => {
        if (categoryName === '') return setMessage({ message: 'Category name cannot be empty!', severity: 'error' });
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/editCategory/${category.ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token')
            },
            body: JSON.stringify({ name: categoryName })
        }).then(res => res.json())
            .then(() => {
                category.Name = categoryName;
                setMessage({ message: 'Category updated successfully!', severity: 'success' });
            }).catch(err => {
                setMessage({ message: err, severity: 'error' });
            });
    }

    return (
        <>
            {category != null && <Modal open={open} onClose={() => {
                handleClose();
                setMessage({ message: 'Note: Editing a category will change the category of all apprenticeships in that category to the new category name.', severity: 'info' });
            }}>
                <Box className='center-modal desc p-4' style={modelStyle}>
                    <Typography variant="h4" className="text-center mb-3 mt-2 ps-2 pe-2">Edit Category</Typography>
                    <div className="row mb-3">
                        <input type="text" className="form-control" placeholder="Category Name" value={categoryName} onChange={e => setCategoryName(e.target.value)} />
                    </div>
                    <div className="row mb-2">
                        <Button variant="contained" color="success" className="col ms-5 me-5" onClick={() => {
                            editCategory();
                        }}>Save</Button>
                        <Button variant="contained" color="error" className="col me-5 ms-5" onClick={e => deleteCategory(e, category.ID)}>Delete</Button>
                        <Button variant="contained" color="primary" className="col me-5 ms-5" onClick={() => {
                            handleClose();
                            setMessage({ message: 'Note: Editing a category will change the category of all apprenticeships in that category to the new category name.', severity: 'info' });
                        }}>Cancel</Button>
                    </div>
                    <Alert severity={message.severity} className="mt-3">{message.message}</Alert>
                </Box>
            </Modal>}
        </>
    )
}

const AddCategoryModal = ({ open, handleClose, setCategoryList, setSnackBarInfo }) => {
    const modelStyle = {
        backgroundColor: 'white',
    }

    const [categoryName, setCategoryName] = useState('');

    const addCategory = () => {
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/addCategory`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            authorization: localStorage.getItem('token') },
            body: JSON.stringify({ name: categoryName })
        }).then(res => res.json())
            .then(data => {
                if (data.error) return setSnackBarInfo({ open: true, message: data.error, severity: 'error' });
                setCategoryList(prevCategoryList => [...prevCategoryList, { ID: data.category.ID, Name: data.category.Name, apprenticeshipCount: 0 }]);
                setSnackBarInfo({ open: true, message: 'Category added with ID: ' + data.category.ID, severity: 'success' });
                setCategoryName('');
                handleClose();
            }).catch(err => {
                setSnackBarInfo({ open: true, message: err, severity: 'error' });
            });
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className='center-modal desc p-4' style={modelStyle}>
                <Typography variant="h4" className="text-center mb-3 mt-2 ps-2 pe-2">Add Category</Typography>
                <div className="row mb-3">
                    <input type="text" className="form-control" placeholder="Category Name" value={categoryName} onChange={e => setCategoryName(e.target.value)} />
                </div>
                <div className="row mb-2">
                    <Button variant="contained" color="success" className="col ms-5 me-5" onClick={addCategory}>Add</Button>
                    <Button variant="contained" color="primary" className="col me-5 ms-5" onClick={handleClose}>Cancel</Button>
                </div>
            </Box>
        </Modal>
    )
}


export default AdminCategoryEdit;