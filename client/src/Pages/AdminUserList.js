import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminTable from "../Component/AdminTable";
import { Box, Modal, Typography, Button } from "@mui/material";

function AdminUserList({isAdmin, setSnackBarInfo}){
    const navigate = useNavigate();
    useEffect(() => {
        if(!isAdmin) navigate('/pageNotFound');
    }, []);

    const columns = [
        { id: 'id', label: 'ID', minWidth: 50, align: 'center' },
        { id: 'Name', label: 'Name', minWidth: 50, align: 'center'},
        { id: 'Type', label: 'Type', minWidth: 50, align: 'center' },
        { id: 'Deactive', label: 'Edit', minWidth: 50, align: 'center'},
    ];

    const [userList, setUserList] = useState([]);
    const [saveUserList, setSaveUserList] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deactiveUserID, setDeactiveUserID] = useState(null);

    const openModal = (row) => {
        setSelectedUser(row);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setTimeout(() => {
            if(searchValue === ''){
                setUserList(saveUserList);
            }
            else{
                setUserList(userList.filter(user => {
                    return user.Name.toLowerCase().includes(searchValue) || user.id.toString().includes(searchValue);
                }));
            }
        }, 500);
    }

    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/users/true`, {
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
            setSaveUserList(userList);
          })
          .catch(err => {
            setSnackBarInfo({open: true, message: 'Error Fetching User List ' + err, severity: 'error'});
          });
      }, []);   
      
      const deactiveAccount = (id) => {
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/deactiveUser/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('token'),
          },
        })
          .then(res => res.json())
          .then(data => {
            if(data.error) return console.log(data.error);
            setUserList(userList.filter(user => user.id !== id));
            setSaveUserList(saveUserList.filter(user => user.id !== id));
            setSnackBarInfo({open: true, message: 'User Deactivated', severity: 'success'});
          })
          .catch(err => {
            setSnackBarInfo({open: true, message: 'Error Deactivating User ' + err, severity: 'error'});
          });
      }

      const openConfirm = (e, id) => {
        e.stopPropagation();
        setOpenDeleteModal(true);
        setDeactiveUserID(id);
      }

      const confirmDialogClose = () => {
        setOpenDeleteModal(false);
        setDeactiveUserID(null);
      }

      const ConfimDeleteDialog = () => {
        const modelStyle = {
            backgroundColor: 'white',
        }
        
        return (
            <>
              {deactiveUserID != null &&  <Modal
                open={openDeleteModal}
                onClose={confirmDialogClose}>
                    <Box className='center-modal desc p-4' style={modelStyle}>
                        <h5 className="text-center mb-4 mt-1">Are you sure you want to deactive</h5>
                        <h5 className="text-center mb-4 mt-1"> this user account?</h5>
                        <div className="row text-center mb-2">
                            <div className="col-6 ">
                                <Button variant="contained" color="error" onClick={() => {
                                  deactiveAccount(deactiveUserID);
                                  confirmDialogClose();
                                }}>Delete</Button>
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

      const [buttons, setButtons] = useState([{text: 'Deactive', color: 'error', onClick: openConfirm}]);

    return(
        <div className="container mt-auto mb-auto text-center">
            <h2>Admin User List</h2>
            <input type="text" placeholder="Search" className="form-control mt-3 mb-3" onChange={handleSearch}/>
            <AdminTable columns={columns} data={userList} rowButtons={buttons} onRowClick={openModal}/>
            <UserModal user={selectedUser} open={open} handleClose={handleClose} deactiveAccount={deactiveAccount}/>
            <ConfimDeleteDialog/>
        </div>
    )
}

const UserModal = ({ user, open, handleClose, deactiveAccount }) => {
  const modelStyle = {
      backgroundColor: 'white',
  }
  return (
      <>
          {user != null && <Modal open={open} onClose={handleClose}>
              <Box className='center-modal desc p-5' style={modelStyle}>
                  <Typography variant="h4" className="text-center mb-3">User Details</Typography>
                  <div className="row mb-3">
                      <div className="col-md-5">
                          <h5 className="text-center">Name</h5>
                          <p className="text-center">{user.Name}</p>
                      </div>
                      <div className="col-md-7">
                          <h5 className="text-center">Email</h5>
                          <p className="text-center">{user.Email}</p>
                      </div>
                  </div>
                  <div className="row mb-3">
                      <div className="col-md-5">
                          <h5 className="text-center">ID</h5>
                          <p className="text-center">{user.id}</p>
                      </div>
                      <div className="col-md-7">
                          <h5 className="text-center">Phone</h5>
                          <p className="text-center">{user.Phone_Number}</p>
                      </div>
                  </div>
                  <div className="row mb-3">
                      <div className="col-md-5">
                          <h5 className="text-center">Type</h5>
                          <p className="text-center">{user.User_Type === 2 ? 'Owner' : 'Apprentice'}</p>
                      </div>
                      <div className="col-md-7">
                          <h5 className="text-center">{user.User_Type === 2 ? 'Major' : 'Study Level'}</h5>
                          <p className="text-center">{user.User_Type === 2 ? user.Owner.Major : user.apprentice.Study_Level}</p>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md-5 ms-auto">
                          <Button variant="contained" color="error" className="m-2" onClick={e => {
                            deactiveAccount(e,user.id);
                            handleClose();
                          }}>Deactive</Button>
                      </div>
                      <div className="col-md-3 me-auto">
                          <Button variant="contained" color="primary" className="m-2" onClick={handleClose}>Close</Button>
                      </div>
                  </div>
              </Box>
          </Modal>}
      </>
  )
}

export default AdminUserList;