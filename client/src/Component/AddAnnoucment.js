import { Modal, Box, Select, MenuItem, InputLabel, FormControl, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import '../Assets/Styles/AddAnnouncement.css'
const AddAnnoucment = ({ open, handleClose, appList, setSnackBarInfo, appID, appName }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [content, setContent] = useState(() => EditorState.createEmpty());
    const [subject, setSubject] = useState('');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [apprenticeship, setApprenticeship] = useState(appID === null? appList[0].ID : appID);
    const [annoucmentContantOpen, setAnnoucmentContantOpen] = useState(false);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth);
        });
        return () => window.removeEventListener('resize', () => {
            setWindowWidth(window.innerWidth);
        });
    }, []);

    const verifyInput = () => {
        if (apprenticeship === '') {
            setSnackBarInfo({ severity: 'error', message: 'Please select apprenticeship', open });
            return false;
        }

        if (subject === '') {
            setSnackBarInfo({ severity: 'error', message: 'Please enter subject', open });
            return false;
        }

        if (content.getCurrentContent().getPlainText() === '') {
            setSnackBarInfo({ severity: 'error', message: 'Please enter content', open });
            return false;
        }
        return true;
    }

    const handleAddAnnoucment = (e) => {
        e.preventDefault();
        if (!verifyInput()) return;
        const data = {
            Apprenticeship_ID: apprenticeship,
            Subject: subject,
            Content: draftToHtml(convertToRaw(content.getCurrentContent())),
            Date_Of_Creation: new Date(),
            Owner_ID: user.id
        }
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/addAnnouncement`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token')
            },
            body: JSON.stringify(data),
        }).then(res => res.json()).then(data => {
            if (data.success) {
                setSnackBarInfo({ severity: 'success', message: 'Annoucment added successfully', open });
                handleClose();
            } else {
                console.log(data);
                setSnackBarInfo({ severity: 'error', message: 'Failed to add annoucment', open });
            }
        }).catch(err => {
            setSnackBarInfo({ severity: 'error', message: err.message, open });
        });
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className='center-modal' sx={{ background: 'white' }}>
                <h3 className="text-center p-3">Add Annoucment</h3>
                <form className="p-3">
                    <FormControl className="mb-3 form-control">
                        <InputLabel id='ApprenticeshipListLebal'>Apprenticeship</InputLabel>
                        <Select labelId="ApprenticeshipListLebal" label="Apprenticeship" variant='outlined' disabled={appID !== null}
                            value={apprenticeship}
                            onChange={e => setApprenticeship(e.target.value)}>
                            {appList && appList.map(app => <MenuItem key={app.ID} value={app.ID}>{app.Name}</MenuItem >)}
                            {appID && <MenuItem key={appID} value={appID}>{appName}</MenuItem >}
                        </Select>
                    </FormControl>
                    <div className="mb-3">
                        <label htmlFor="subject" className="form-label">Subject</label>
                        <input type="text" className="form-control" id="subject" onChange={e => setSubject(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Content</label>
                        <Editor id="content"
                            editorState={content}
                            placeholder="Apprenticeship Description"
                            wrapperClassName={windowWidth > 990 ? '' : 'd-none'}
                            editorClassName="border annoucment-editor"
                            onEditorStateChange={setContent} />
                        <Button variant="contained" className={windowWidth > 990 ? 'd-none' : 'mb-3 text-center'} sx={{ width: '100%' }} onClick={() => setAnnoucmentContantOpen(true)}>Add Contant</Button>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary" onClick={handleAddAnnoucment}>Add</button>
                        <button type="button" className="btn btn-secondary ms-3" onClick={handleClose}>Close</button>
                    </div>
                </form>
                {annoucmentContantOpen && <AnnoucmentEditor open={annoucmentContantOpen} handleClose={() => setAnnoucmentContantOpen(false)} setContent={setContent} content={content} />}
            </Box>
        </Modal>
    );
}

const AnnoucmentEditor = ({ open, handleClose, setContent, content }) => {
    const [contentCopy, setContentCopy] = useState(content);
    return (
        <Modal open={open} onClose={() => {
            setContentCopy(content);
            handleClose();
        }}>
            <Box className='mb-3 text-center container p-3 add-app-mobile' sx={{ background: 'white' }}>
                <h3 className="text-center p-3">Add Content</h3>
                <Editor
                    editorState={contentCopy}
                    placeholder="Apprenticeship Description"
                    editorClassName="mobile-text-editor"
                    onEditorStateChange={setContentCopy} />
                <Button variant="contained" className='mt-3' sx={{ width: '100%' }} onClick={() => {
                    setContent(contentCopy);
                    handleClose();
                }}
                >Add Contant</Button>
            </Box>
        </Modal>
    );
}

export default AddAnnoucment;