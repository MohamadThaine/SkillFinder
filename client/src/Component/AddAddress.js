import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";

const AddAddress = ({ open, handleClose, setSnackBarInfo }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [address, setAddress] = useState({ City: "", Street_NO: "", Street_Name: "", Description: "", Owner_ID: user.id });

  const verifyAddress = () => {
    if (address.City === "" || address.Street_NO === "" || address.Street_Name === "" || address.Description === "") {
      setSnackBarInfo({ severity: "error", message: "Please fill all the fields", open: true });
      return false;
    }
    return true;
  }

  const addAddress = async () => {
    if (!verifyAddress()) return;
    try {
      const addressResponse = await fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/addAddress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(address)
      });
      const addressData = await addressResponse.json();
      if (addressResponse.status === 200) {
        setSnackBarInfo({ severity: "success", message: "Address added successfully", open: true });
        handleClose();
      } else {
        setSnackBarInfo({ severity: "error", message: addressData.message, open: true });
      }
    } catch (error) {
      setSnackBarInfo({ severity: "error", message: error.message, open: true });
    }
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className='center-modal text-center' sx={{ background: 'white' }}>
        <Typography variant='h4' sx={{ textAlign: 'center', margin: '1rem' }}>Add Address</Typography>
        <input type='text' className="form-control mb-3" placeholder='City' value={address.City} onChange={(e) => setAddress({ ...address, City: e.target.value })} />
        <input type='text' className="form-control mb-3" placeholder='Street Number' value={address.Street_NO} onChange={(e) => setAddress({ ...address, Street_NO: e.target.value })} />
        <input type='text' className="form-control mb-3" placeholder='Street Name' value={address.Street_Name} onChange={(e) => setAddress({ ...address, Street_Name: e.target.value })} />
        <textarea type='text' className="form-control mb-3" placeholder='Description' value={address.Description} onChange={(e) => setAddress({ ...address, Description: e.target.value })} />
        <Button variant='contained' className="mb-3 me-3" color="success" onClick={addAddress}>
          <Typography variant='h6' sx={{ color: 'white' }}>Add</Typography>
        </Button>
        <Button variant='contained' onClick={handleClose} className="mb-3" color="error">
          <Typography variant='h6' sx={{ color: 'white' }}>Cancel</Typography>
        </Button>
      </Box>
    </Modal>
  );
};

export default AddAddress;
