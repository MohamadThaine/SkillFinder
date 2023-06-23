import { Box, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow  } from "@mui/material"
import { useEffect, useState } from "react";

const StudentTable = ({ open, handleClose, appID }) => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/getAppStudents/${appID}`, {
            method: 'GET',
            headers: {
                authorization: localStorage.getItem('token')
            },
        }).then(res => res.json()).then(data => {
            if (data.success) {
                setStudents(data.students);
                console.log(data.students);
            } else {
                console.log(data);
            }
        }).catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className='center-modal' sx={{ background: 'white' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Enrolled</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students && students.length > 0 && students.map((row) => (
                                <TableRow
                                    key={row.ID}
                                    tabIndex={-1}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell key={row.ID} align="center">
                                    {row.apprentice.User.Name}
                                    </TableCell>
                                    <TableCell key={row.ID} align="center">
                                        {row.Date}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Modal>
    )
}

export default StudentTable

