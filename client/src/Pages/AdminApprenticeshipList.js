import { Paper, Table, TableRow, TableBody, TableContainer, TableCell, TableHead, Modal, Box, Button,  } from "@mui/material";
import { useEffect, useState } from "react";
import React from 'react';
import AdminTable from "../Component/AdminTable";

function AdminApprenticeshipList(){
    const columns = [
        { id: 'Name', label: 'Name', minWidth: 50 , align: 'center' },
        { id: 'Price', label: 'Price', minWidth: 50, align: 'center' },
        { id: 'Owner.User.Username', label: 'Owner', minWidth: 50, align: 'center' },
        { id: 'ID', label: 'ID', minWidth: 50, align: 'center' },
        { id: 'Delete', label: 'Delete', minWidth: 50, align: 'center' },
    ];
    const [apprenticeship, setApprenticeship] = useState(null);
    const [apprenticeshipList, setApprenticeshipList] = useState([]);
    const [saveApprenticeship, setSaveApprenticeship] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deletedApprenticeshipID, setDeletedApprenticeshipID] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const viewDetalis = (apprenticeship) => {
        setOpenModal(true);
        setApprenticeship(apprenticeship);
    }

    const handleClose = () => {
        setOpenModal(false);
        setApprenticeship(null);
    }

    const deleteApprenticeship = (e,id) => {
        setDeletedApprenticeshipID(id);
        e.stopPropagation();
        setOpenDeleteModal(true);
    }

    const handleSearch = (e) => {
        const searchText = e.target.value;
        setSearchTerm(searchText);
        setSearchTerm(e.target.value);
        setTimeout(() => {
            if(searchText === ''){
                setApprenticeshipList(saveApprenticeship);
            }else{
                setApprenticeshipList(apprenticeshipList.filter((apprenticeship) => apprenticeship.name.toLowerCase().includes(searchText.toLowerCase())));
            }
        }
        , 500);
    }

    const confirmDialogClose = () => {
        setOpenDeleteModal(false);
        setDeletedApprenticeshipID(null);
    }

    const ConfimDeleteDialog = () => {
        const modelStyle = {
            backgroundColor: 'white',
        }
        const confirmDelte = () => {
            setApprenticeshipList(apprenticeshipList.filter((apprenticeship) => apprenticeship.ID !== deletedApprenticeshipID));
            setSaveApprenticeship(saveApprenticeship.filter((apprenticeship) => apprenticeship.ID !== deletedApprenticeshipID));
            fetch(`http://localhost:5000/deleteApprenticeship/${deletedApprenticeshipID}`, {
                method: 'DELETE',
            }).then(res => res.json())
            .then(data => {
                confirmDialogClose();
            }
            ).catch(err => console.log(err));
    }
        return (
            <>
              {deletedApprenticeshipID != null &&  <Modal
                open={openDeleteModal}
                onClose={confirmDialogClose}>
                    <Box className='center-modal desc p-4' style={modelStyle}>
                        <h4 className="text-center mb-5">Are you sure you want to delete this apprenticeship?</h4>
                        <div className="row text-center mb-2">
                            <div className="col-6 ">
                                <Button variant="contained" color="error" onClick={confirmDelte}>Delete</Button>
                            </div>
                            <div className="col-6">
                                <Button variant="contained" color="secondary" onClick={confirmDialogClose}>Cancel</Button>
                            </div>
                        </div>
                    </Box>
                </Modal>}
            </>
            
        )
    }

    useEffect(() => {
        fetch('http://localhost:5000/apprenticeships')
        .then(res => res.json())
        .then(data => {
            setApprenticeshipList(data);
            setSaveApprenticeship(data);
        }).catch(err => console.log(err));
    }, [])

    return (
        <div className="container mt-auto mb-auto">
            <input type="text" placeholder="Search" className="form-control mt-3 mb-3" value={searchTerm} onChange={handleSearch}/>
            <AdminTable columns={columns} data={apprenticeshipList} onRowClick={viewDetalis} onBtnClick={deleteApprenticeship} rowButtonText={'Delete'}/>
            <ApprenticeshipInfo apprenticeship={apprenticeship} open={openModal} handleClose={handleClose}/>
            <ConfimDeleteDialog/>
        </div>  
    )  
}

const ApprenticeshipInfo = ({apprenticeship, open, handleClose}) => {
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
                                <p className="text-center">{apprenticeship.Owner.User.Username}</p>
                            </div>
                            <div className="col-6">
                                <h5 className="text-center">ID</h5>
                                <p className="text-center">{apprenticeship.ID}</p>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-6">
                                <h5 className="text-center">Participants</h5>
                                <p className="text-center">{
                                    apprenticeship.apprenticeship_apprentices.length > 0? apprenticeship.apprenticeship_apprentices[0].enrolledStudentsCount : 'No Participants'
                                }</p>
                            </div>
                            <div className="col-6">
                                <h5 className="text-center">Method</h5>
                                <p className="text-center">
                                {apprenticeship.LearningMethod === 1
                                    ? 'Online'
                                    : apprenticeship.LearningMethod  === 2
                                    ? 'On-Site'
                                    : 'Online & On-Site'}
                                </p>
                            </div>
                        </div>
                        <div className="row text-center mb-2">
                            <div className="col-6 ">
                                <Button variant="contained" color="error">Delete</Button>
                            </div>
                            <div className="col-6">
                                <Button variant="contained" color="secondary" onClick={handleClose}>Close</Button>
                            </div>
                        </div>
                </Box>
            </Modal>}
        </>
    )
}

export default AdminApprenticeshipList;

