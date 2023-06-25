import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminTable from "../Component/AdminTable";

const AdminSimulationList = ({ isAdmin, setSnackBarInfo }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAdmin) navigate('/pageNotFound');
    }, []);

    const columns = [
        { id: 'Name', label: 'Name', minWidth: 50, align: 'center' },
        { id: 'Category.Name', label: 'Category', minWidth: 50, align: 'center' },
        { id: 'Path', label: 'Path', minWidth: 50, align: 'center' },
        { id: 'Delete', label: 'Delete', minWidth: 50, align: 'center' },
        { id: 'Edit', label: 'Edit', minWidth: 50, align: 'center' },
    ];
    const [simulationList, setSimulationList] = useState([])
    const [saveSimulationList, setSaveSimulationList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedSimulation, setSelectedSimulation] = useState(null);
    const [openAdd, setOpenAdd] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const openModal = (row) => {
        setSelectedSimulation(row);
        setOpenEdit(true);
    }

    const handleClose = () => {
        setSelectedSimulation(null);
        setOpenEdit(false);
    }

    const openDeleteModal = (e, row) => {
        e.stopPropagation();
        setSelectedSimulation(row);
        setOpenDelete(true);
    }

    const handleCloseDelete = () => {
        setSelectedSimulation(null);
        setOpenDelete(false);
    }

    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setTimeout(() => {
            if (searchValue === '') {
                setSimulationList(saveSimulationList);
            }
            else {
                setSimulationList(simulationList.filter(simulation => {
                    return simulation.Name.toLowerCase().includes(searchValue) || simulation.Path.toLowerCase().includes(searchValue);
                }));
            }
        }, 500);
    }
    const [buttons, setButtons] = useState([{ text: 'Delete', color: 'error', onClick: openDeleteModal }, { text: 'Edit', color: 'primary', onClick: openModal }]);
    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/getSimulations`,
            { headers: { authorization: localStorage.getItem('token') } })
            .then(res => res.json())
            .then(data => {
                setSimulationList(data);
                setSaveSimulationList(data);
            }).catch(err => console.log(err));
    }, []);

    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/categories`)
            .then(res => res.json())
            .then(data => {
                const categoryWithoutSimulation = data.filter(category => category.AvailableSimulation === false);
                setCategoryList(categoryWithoutSimulation);
            }).catch(err => console.log(err));
    }, []);

    return (
        <div className="container mt-auto mb-auto">
            <Typography variant="h4" className="text-center mb-3 mt-2 ps-2 pe-2">Simulations</Typography>
            <div className="row">
                <Button variant="contained" color="primary" className="col-3 ms-auto me-3" onClick={() => setOpenAdd(true)}> + Add Simulation</Button>
            </div>
            <input type="text" placeholder="Search" className="form-control mt-3 mb-3" onChange={handleSearch} />
            <AdminTable columns={columns} data={simulationList} rowButtons={buttons} onRowClick={openModal} />
            {openAdd && <AddSimulation open={openAdd} handleClose={() => setOpenAdd(false)} categoryList={categoryList} setSnackBarInfo={setSnackBarInfo} setSimulationList={setSimulationList} setCategoryList={setCategoryList} />}
            {openEdit && <EditSimulation open={openEdit} handleClose={handleClose} setSnackBarInfo={setSnackBarInfo} simulation={selectedSimulation} setSimulationList={setSimulationList} />}
            {openDelete && <DeleteSimulation open={openDelete} handleClose={handleCloseDelete} setSnackBarInfo={setSnackBarInfo} simulation={selectedSimulation} setSimulationList={setSimulationList} simulationList={simulationList} />}
        </div>
    )
}

const AddSimulation = ({ open, handleClose, categoryList, setSnackBarInfo, setSimulationList, setCategoryList }) => {
    const [simulation, setSimulation] = useState({ Name: '', Path: '', Category_ID: categoryList[0]?.ID });

    const verifySimulation = () => {
        if (simulation.Name === '' || simulation.Path === '' || simulation.Category_ID === '') {
            setSnackBarInfo({ open: true, message: 'Please fill all the fields', severity: 'error' });
            return false;
        }
        return true;
    }

    const handleAddSimulation = () => {
        if (!verifySimulation()) return;
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/addSimulation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token'),
            },
            body: JSON.stringify(simulation),
        }).then(res => res.json())
            .then(data => {
                if (!data.success) return setSnackBarInfo({ open: true, message: 'Something went wrong', severity: 'error' });
                setSnackBarInfo({ open: true, message: 'Simulation Added', severity: 'success' });
                setSimulationList(prevSimulationList => [...prevSimulationList, {
                    ...simulation, Category: {
                        Name: categoryList.find(category => category.ID === simulation.Category_ID).Name
                    }
                }]);
                setCategoryList(categoryList.filter(category => category.ID !== simulation.Category_ID));
                handleClose();
            }).catch(err => {
                setSnackBarInfo({ open: true, message: 'Something went wrong', severity: 'error' });
            });
    }
    return (
        <Modal open={open} onClose={handleClose}>
            <Box className='center-modal' sx={{ background: 'white' }}>
                <Typography variant="h4" className="text-center mb-3 mt-2 ps-2 pe-2">Add Simulation</Typography>
                <FormControl className="col-12 mb-3">
                    <InputLabel id="categoryLebal">Category</InputLabel>
                    <Select labelId="categoryLebal" id="category" value={simulation.Category_ID} label="Category" onChange={(e) => setSimulation(prevSimulation => ({ ...prevSimulation, Category_ID: e.target.value }))}>
                        {categoryList.map(category => <MenuItem key={category.ID} value={category.ID}>{category.Name}</MenuItem>)}
                    </Select>
                </FormControl>
                <TextField className="col-12 mb-3" label="Name" variant="outlined" value={simulation.Name} onChange={(e) => setSimulation(prevSimulation => ({ ...prevSimulation, Name: e.target.value }))} />
                <TextField className="col-12 mb-3" label="Path" variant="outlined" value={simulation.Path} onChange={(e) => setSimulation(prevSimulation => ({ ...prevSimulation, Path: e.target.value }))} />
                <Button variant="contained" color="primary" className="col-12 mb-3" onClick={handleAddSimulation}>Add</Button>
                <Button variant="contained" color="secondary" className="col-12 mb-3" onClick={handleClose}>Cancel</Button>
            </Box>
        </Modal>
    )
}

const EditSimulation = ({ open, handleClose, simulation, setSimulationList, setSnackBarInfo }) => {
    const [editSimulation, setEditSimulation] = useState(simulation);
    const verifySimulation = () => {
        if (editSimulation.Name === '' || editSimulation.Path === '') {
            setSnackBarInfo({ open: true, message: 'Please fill all the fields', severity: 'error' });
            return false;
        }
        return true;
    }

    const handleEditSimulation = () => {
        if (!verifySimulation()) return;
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/updateSimulation/${editSimulation.Category_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token'),
            },
            body: JSON.stringify(editSimulation),
        }).then(res => res.json())
            .then(data => {
                if (!data.success) return setSnackBarInfo({ open: true, message: 'Something went wrong', severity: 'error' });
                setSnackBarInfo({ open: true, message: 'Simulation Edited', severity: 'success' });
                setSimulationList(prevSimulationList => prevSimulationList.map(prevSimulation => prevSimulation.Category_ID === simulation.Category_ID ? { ...prevSimulation, ...editSimulation } : prevSimulation));
                handleClose();
            }).catch(err => {
                setSnackBarInfo({ open: true, message: 'Something went wrong', severity: 'error' });
            });
    }


    return (
        <>
            {simulation && <Modal open={open} onClose={handleClose}>
                <Box className='center-modal' sx={{ background: 'white' }}>
                    <Typography variant="h4" className="text-center mb-3 mt-2 ps-2 pe-2">Edit Simulation</Typography>
                    <TextField className="col-12 mb-3" label="Name" variant="outlined" value={editSimulation.Name} onChange={(e) => setEditSimulation(prevSimulation => ({ ...prevSimulation, Name: e.target.value }))} />
                    <TextField className="col-12 mb-3" label="Path" variant="outlined" value={editSimulation.Path} onChange={(e) => setEditSimulation(prevSimulation => ({ ...prevSimulation, Path: e.target.value }))} />
                    <Button variant="contained" color="primary" className="col-12 mb-3" onClick={handleEditSimulation}>Save</Button>
                    <Button variant="contained" color="secondary" className="col-12 mb-3" onClick={handleClose}>Cancel</Button>
                </Box>
            </Modal>}
        </>
    )
}

const DeleteSimulation = ({ open, handleClose, simulation, setSimulationList, setSnackBarInfo, simulationList }) => {
    const handleDeleteSimulation = () => {
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/deleteSimulation/${simulation.Category_ID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token'),
            },
        }).then(res => res.json())
            .then(data => {
                if (!data.success) return setSnackBarInfo({ open: true, message: 'Something went wrong', severity: 'error' });
                setSnackBarInfo({ open: true, message: 'Simulation Deleted', severity: 'success' });
                setSimulationList(simulationList.filter(prevSimulation => prevSimulation.Category_ID !== simulation.Category_ID));
                handleClose();
            }).catch(err => {
                setSnackBarInfo({ open: true, message: 'Something went wrong', severity: 'error' });
            });
    }
    return (
        <>
            {simulation && <Modal open={open} onClose={handleClose}>
                <Box className='center-modal' sx={{ background: 'white' }}>
                    <Typography variant="h4" className="text-center mb-3 mt-2 ps-2 pe-2">Delete Simulation</Typography>
                    <Typography variant="h6" className="text-center mb-3 mt-2 ps-2 pe-2">Are you sure you want to delete {simulation.Name}?</Typography>
                    <Button variant="contained" color="primary" className="col-12 mb-3" onClick={handleDeleteSimulation}>Delete</Button>
                    <Button variant="contained" color="secondary" className="col-12 mb-3" onClick={handleClose}>Cancel</Button>
                </Box>
            </Modal>}
        </>
    )
}

export default AdminSimulationList
