import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Editor } from 'react-draft-wysiwyg';
import { Box, Button, Modal, Typography } from '@mui/material';

export const UtilApprenticeshipPicture = ({ picture, setAppPictures, action }) => {
    const [pictureName, setPictureName] = useState(picture.name ? picture.name.slice(0, 40) : picture.slice(picture.lastIndexOf("\\") + 1) );
    return (
        <>
            {picture &&
                <div className="upload-app-pic mb-3">
                    <Typography variant="body1">{pictureName}...</Typography>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-x remove-upload-img" viewBox="0 0 16 16" onClick={() => {
                        setAppPictures(prevPictures => prevPictures.filter(prevPicture => prevPicture !== picture));
                    }}>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                    {action === "Edit" && !picture.name && <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-box-arrow-up-right show-img" viewBox="0 0 16 16"
                        onClick={() => {
                            window.open(picture, '_blank');
                        }}>
                        <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
                        <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
                    </svg>}
                </div>
            }
        </>
    )
}

export const UtilApprenticeshipDescription = ({ description, setDescription, open, handleClose }) => {
    const [editorState, setEditorState] = useState(description);

    return (
        <Modal open={open} onClose={() => {
            setDescription(editorState);
            handleClose();
        }}>
            <Box className="mb-3 text-center container p-3 add-app-mobile" style={{ background: 'white' }}>
                <h4 className="mt-2">Enter Apprenticeship Description</h4>
                <Editor
                    editorState={editorState}
                    placeholder="Apprenticeship Description"
                    onEditorStateChange={setEditorState}
                    editorClassName="border mobile-text-editor" />
                <Button variant="contained" color="success" className="mt-3" onClick={() => {
                    setDescription(editorState);
                    handleClose();
                }}>Done</Button>
            </Box>
        </Modal>
    )
}

export const ActionSuccessfully = ({ open, handleClose, ID, action }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box className="center-modal text-center p-5" style={{ background: 'white' }}>
                <h4 className="mt-2">{action} Successfully</h4>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2" className='mt-4 check-mark-first-time row ms-auto me-auto'>
                    <circle className="path circle" fill="none" stroke="#73AF55" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                    <polyline className="path check" fill="none" stroke="#73AF55" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
                </svg>
                <Link to={"/Apprenticeship/" + ID} className="btn btn-success mt-5 text-center">Visit a Demo</Link>
            </Box>
        </Modal>
    )
}
