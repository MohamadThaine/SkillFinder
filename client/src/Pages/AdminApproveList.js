import { Button, Modal, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminTable from "../Component/AdminTable";
function AdminApproveList({ isAdmin }) {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAdmin) {
            navigate('/pageNotFound');
        }
    }, [])
    const [activeButton, setActiveButton] = useState('Owners');
    const OwnersColumns = [
        { id: 'Name', label: 'Name', minWidth: 50, align: 'center' },
        { id: 'Email', label: 'Email', minWidth: 50, align: 'center' },
        { id: 'Phone_Number', label: 'Phone', minWidth: 50, align: 'center' },
        { id: 'id', label: 'ID', minWidth: 50, align: 'center' },
        { id: 'Approve', label: 'Approve', minWidth: 50, align: 'center' },
        { id: 'Disapprove', label: 'Disapprove', minWidth: 50, align: 'center' }
    ];
    const ApprenticeshipsColumns = [
        { id: 'Name', label: 'Name', minWidth: 50, align: 'center' },
        { id: 'Owner.User.Name', label: 'Owner Name', minWidth: 50, align: 'center' },
        { id: 'Category.Name', label: 'Category', minWidth: 50, align: 'center' },
        { id: 'Price', label: 'Price', minWidth: 50, align: 'center' },
        { id: 'Approve', label: 'Approve', minWidth: 50, align: 'center' },
        { id: 'Disapprove', label: 'Disapprove', minWidth: 50, align: 'center' }
    ];

    const [ownersList, setOwnersList] = useState([]);
    const [apprenticeshipsList, setApprenticeshipsList] = useState([]);
    const [open, setOpen] = useState(false);
    const [owner, setOwner] = useState(null);
    const [apprenticeship, setApprenticeship] = useState(null);
    const openModal = (row) => {
        setOpen(true);
        if(activeButton === 'Owners'){
            setOwner(row);
        }
        else{
            setApprenticeship(row);
        }
    }

    const handleClose = () => {
        setOpen(false);
        setApprenticeship(null);
        setOwner(null);
    }

    const approveApprenticeship = (e,ID) => {
        e.stopPropagation();
        fetch(`http://localhost:5000/approve/apprenticeship/${ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            setApprenticeshipsList(apprenticeshipsList.filter(apprenticeship => apprenticeship.ID !== ID));
        }).catch(err => console.log(err));
        }

    const approveOwner = (e,ID) => {
        e.stopPropagation();
        fetch(`http://localhost:5000/approve/owner/${ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            setOwnersList(ownersList.filter(owner => owner.User_ID !== ID));
        }
        ).catch(err => console.log(err));
    }

    const disapproveApprenticeship = (e ,ID) => {
        e.stopPropagation();
        fetch(`http://localhost:5000/deleteApprenticeship/${ID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(() => {
            setApprenticeshipsList(apprenticeshipsList.filter(apprenticeship => apprenticeship.ID !== ID));
        }
        ).catch(err => console.log(err));
    }

    const disapproveOwner = (e, ID) => {
        e.stopPropagation();
        fetch(`http://localhost:5000/rejectOwner/${ID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            setOwnersList(ownersList.filter(owner => owner.User_ID !== ID));
        }
        ).catch(err => console.log(err));
    }
        
    useEffect(() => {
        fetch('http://localhost:5000/users/false', {
            headers: {
                authorization: localStorage.getItem('token'),
        }})
        .then(res => res.json())
        .then(data => {
            setOwnersList(data);
        }).catch(err => console.log(err));
    }, [])

    useEffect(() => {
        fetch('http://localhost:5000/apprenticeships/false')
        .then(res => res.json())
        .then(data => {
            setApprenticeshipsList(data);
        }).catch(err => console.log(err));
    }, [])

    const [OwnerButtons, setButtons] = useState([{ text: 'Approve', color: 'success', onClick: approveOwner} , { text: 'Disapprove', color: 'error', onClick: disapproveOwner }]);
    const [ApprenticeshipButtons, setApprenticeshipButtons] = useState([{ text: 'Approve', color: 'success', onClick: approveApprenticeship} , { text: 'Disapprove', color: 'error', onClick: disapproveApprenticeship }]);


    return (
        <div className="container mt-auto mb-auto">
            <Typography variant="h4" className="mt-3 mb-3 text-center">Approve List</Typography>
            <div className="row">
                <Button variant={activeButton === 'Owners' ? 'outlined' : 'contained'} color="primary" className="col-md-3 ms-auto m-2" onClick={() => setActiveButton('Owners')}>Owners</Button>
                <Button variant={activeButton === 'Apprenticeships' ? 'outlined' : 'contained'} color="primary" className="col-md-3 me-auto m-2" onClick={() => setActiveButton('Apprenticeships')}>Apprenticeships</Button>
            </div>
            <input type="text" className="form-control mt-3 mb-3" placeholder="Search" />
            <AdminTable columns={activeButton === 'Owners' ? OwnersColumns : ApprenticeshipsColumns}
                data={activeButton === 'Owners' ? ownersList : apprenticeshipsList} 
                rowButtons={activeButton === 'Owners' ? OwnerButtons : ApprenticeshipButtons} 
                onRowClick={openModal} />
            <OwnerModal owner={owner} open={open} handleClose={handleClose} />
            <ApprenticeshipModal apprenticeship={apprenticeship} open={open} handleClose={handleClose} />
        </div>
    )
}

const OwnerModal = ({ owner, open, handleClose, approveOwner, disapproveOwner }) => {
    const modelStyle = {
        backgroundColor: 'white',
    }
    return (
        <>
            {owner != null && <Modal open={open} onClose={handleClose}>
                <Box className='center-modal desc p-5' style={modelStyle}>
                    <Typography variant="h4" className="text-center mb-3">Owner Details</Typography>
                    <div className="row mb-3">
                        <div className="col-md-5">
                            <h5 className="text-center">Name</h5>
                            <p className="text-center">{owner.Name}</p>
                        </div>
                        <div className="col-md-7">
                            <h5 className="text-center">Email</h5>
                            <p className="text-center">{owner.Email}</p>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-5">
                            <h5 className="text-center">ID</h5>
                            <p className="text-center">{owner.id}</p>
                        </div>
                        <div className="col-md-7">
                            <h5 className="text-center">Phone</h5>
                            <p className="text-center">{owner.Phone_Number}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Button variant="contained" color="success" className="m-2" onClick={e => approveOwner(e, owner.id)}>Approve</Button>
                        </div>
                        <div className="col">
                            <Button variant="contained" color="error" className="m-2" onClick={e => disapproveOwner(e,owner.id)}>Disapprove</Button>
                        </div>
                        <div className="col">
                            <Button variant="contained" color="primary" className="m-2" onClick={handleClose}>Close</Button>
                        </div>
                    </div>
                </Box>
            </Modal>}
        </>
    )
}

const ApprenticeshipModal = ({apprenticeship, open, handleClose, approveApprenticeship, disapproveApprenticeship}) => {
    const modelStyle = {
        backgroundColor: 'white',
    }
    return (
        <>
            {apprenticeship != null && <Modal
            open={open}
            onClose={handleClose}>
                <Box className='center-modal desc p-5' style={modelStyle}>
                        <h3 className="text-center mb-5">Apprenticeship Details</h3>
                        <div className="row mb-2">
                            <div className="col-6">
                                <h5 className="text-center">Name</h5>
                                <p className="text-center">{apprenticeship.Name}</p>
                            </div>
                            <div className="col-6">
                                <h5 className="text-center">Price</h5>
                                <p className="text-center">{apprenticeship.Price}$</p>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-6">
                                <h5 className="text-center">Owner</h5>
                                <p className="text-center">{apprenticeship.Owner.User.Name}</p>
                            </div>
                            <div className="col-6">
                                <h5 className="text-center">ID</h5>
                                <p className="text-center">{apprenticeship.ID}</p>
                            </div>
                        </div>
                        
                        <div className="row mb-2">
                            <div className="col ">
                                <Button variant="contained" color="success" onClick={e => approveApprenticeship(e, apprenticeship.ID)}>Approve</Button>
                            </div>
                            <div className="col">
                                <Button variant="contained" color="error" onClick={e => disapproveApprenticeship(e,apprenticeship.ID)}>Disapprove</Button>
                            </div>
                            <div className="col">
                                <Button variant="contained" color="primary" onClick={handleClose}>Close</Button>
                        </div>
                    </div>
                </Box>
            </Modal>}
        </>
    )
}

export default AdminApproveList;