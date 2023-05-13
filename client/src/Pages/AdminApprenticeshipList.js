import { Paper, Table, TableRow, TableBody, TableContainer, TableCell, TableHead, Modal, Box, Button,  } from "@mui/material";
import { useEffect, useState } from "react";
import React from 'react';
import AdminTable from "../Component/AdminTable";
import { useNavigate } from "react-router-dom";

function AdminApprenticeshipList({isAdmin, setSnackBarInfo}){
    const navigate = useNavigate();
    if(!isAdmin){
        navigate('/pageNotFound');
    }
    
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
                setApprenticeshipList(apprenticeshipList.filter((apprenticeship) => apprenticeship.Name.toLowerCase().includes(searchText.toLowerCase())));
            }
        }
        , 500);
    }

    const confirmDialogClose = () => {
        setOpenDeleteModal(false);
        setDeletedApprenticeshipID(null);
    }

    const confirmDelte = () => {
        if(deletedApprenticeshipID == null){
            if(apprenticeship != null){
                setDeletedApprenticeshipID(apprenticeship.ID);
            }
        }
        setApprenticeshipList(
            saveApprenticeship.filter(app =>
              app.ID !== (deletedApprenticeshipID ? deletedApprenticeshipID : apprenticeship.ID)
            )
          );
        setSaveApprenticeship(
            saveApprenticeship.filter(app =>
              app.ID !== (deletedApprenticeshipID ? deletedApprenticeshipID : apprenticeship.ID)
            )
          );
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/deleteApprenticeship/${deletedApprenticeshipID ? deletedApprenticeshipID : apprenticeship.ID}`, {
            method: 'DELETE',
        }).then(res => res.json())
        .then(data => {
            confirmDialogClose();
            handleClose();
            setSnackBarInfo({severity:'success', message:'Apprenticeship deleted successfully', open:true});
        }
        ).catch(err => {
            setSnackBarInfo({severity:'error', message:err, open:true});
        });
    }

    const ConfimDeleteDialog = () => {
        const modelStyle = {
            backgroundColor: 'white',
        }
        
        return (
            <>
              {deletedApprenticeshipID != null &&  <Modal
                open={openDeleteModal}
                onClose={confirmDialogClose}>
                    <Box className='center-modal desc p-4' style={modelStyle}>
                        <h5 className="text-center mb-4 mt-1">Are you sure you want to</h5>
                        <h5 className="text-center mb-4 mt-1">delete this apprenticeship?</h5>
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
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/apprenticeships/true`)
        .then(res => res.json())
        .then(data => {
            setApprenticeshipList(data);
            setSaveApprenticeship(data);
        }).catch(err => console.log(err));
    }, [])
    const [buttons, setButtons] = useState([{text:'Delete', color:'error', onClick:deleteApprenticeship}]);
    return (
        <div className="container mt-auto mb-auto">
            <h2 className="text-center">Apprenticeship List</h2>
            <input type="text" placeholder="Search" className="form-control mt-3 mb-3" value={searchTerm} onChange={handleSearch}/>
            <AdminTable columns={columns} data={apprenticeshipList} onRowClick={viewDetalis} rowButtons={buttons}/>
            <ApprenticeshipInfo apprenticeship={apprenticeship} open={openModal} handleClose={handleClose} deleteApprenticeship={confirmDelte}/>
            <ConfimDeleteDialog/>
        </div>  
    )  
}

const ApprenticeshipInfo = ({apprenticeship, open, handleClose, deleteApprenticeship}) => {
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
                                    apprenticeship.enrolledStudentsCount > 0? apprenticeship.enrolledStudentsCount : 'No Participants'
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
                        <div className="row mb-2">
                            <div className="col-6">
                                <h5 className="text-center">Category</h5>
                                <p className="text-center">{apprenticeship.Category.Name}</p>
                            </div>
                            <div className="col-6">
                                <h5 className="text-center">Addresss</h5>
                                <p className="text-center">{apprenticeship.Address != null? apprenticeship.Address : 'No Address'}</p>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-6">
                                <h5 className="text-center">Start Date</h5>
                                <p className="text-center">{apprenticeship.Start_Date}</p>
                            </div>
                            <div className="col-6">
                                <h5 className="text-center">End Date</h5>
                                <p className="text-center">{apprenticeship.End_Date}</p>
                            </div>
                        </div>
                        <div className="row text-center mb-2">
                            <div className="col-6 ">
                                <Button variant="contained" color="error" onClick={deleteApprenticeship}>Delete</Button>

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

