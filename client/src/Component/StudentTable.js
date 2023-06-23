import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react";
import ContactApprentice from "./ContactApprentice";

const StudentTable = ({ open, handleClose, appID }) => {
    const [students, setStudents] = useState([]);
    const [choosedStudent, setChoosedStudent] = useState(null);
    const [openSendMessage, setOpenSendMessage] = useState(false);
    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/getAppStudents/${appID}`, {
            method: 'GET',
            headers: {
                authorization: localStorage.getItem('token')
            },
        }).then(res => res.json()).then(data => {
            if (data.success) {
                setStudents(data.students);
            } else {
                console.log(data);
            }
        }).catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className='center-modal text-center' sx={{ background: 'white' }}>
                <h1>Students</h1>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 400 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Enrolled</TableCell>
                                <TableCell align="center">Contact</TableCell>
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
                                    <TableCell key={row.ID} align="center">
                                        <Button variant="contained" onClick={() => {
                                            setChoosedStudent({
                                                ID: row.apprentice.User.ID,
                                                Name: row.apprentice.User.Name
                                            });
                                            setOpenSendMessage(true);
                                        }}>Contact</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button variant="contained" className="mt-3" onClick={handleClose}>Close</Button>
                {choosedStudent && <ContactApprentice open={openSendMessage} handleClose={() => setOpenSendMessage(false)} user={choosedStudent} />}
            </Box>
        </Modal>
    )
}


export default StudentTable

