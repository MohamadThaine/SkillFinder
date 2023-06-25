import { Box, Modal } from "@mui/material"

const ApprenticeshipSimulation = ({open, handleClose, simulationPath}) => {
    return(
        <Modal open={open} onClose={handleClose}>
            <Box className='center-modal p-3' sx={{width: '95%', height: '95%', background:'white', borderRadius: '0'}}>
                <svg onClick={handleClose} xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16" style={{position: 'absolute', top: '10px', right: '10px', cursor: 'pointer'}}>
                    <path fillRule="evenodd" d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM4.354 3.646a.5.5 0 1 1 .708-.708L8
                    7.293l3.938-3.94a.5.5 0 1 1 .708.708L8.707
                    8l3.94 3.938a.5.5 0 0 1-.708.708L8 8.707l-3.938
                    3.94a.5.5 0 1 1-.708-.708L7.293 8
                    3.354 4.062a.5.5 0 0 1 0-.708z"/>
                </svg>
                <iframe src={simulationPath} style={{width: '100%', height: '100%'}}/>
            </Box>
        </Modal>
    )
}

export default ApprenticeshipSimulation;
