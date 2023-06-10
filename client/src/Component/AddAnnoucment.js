import { Modal, Box, Select, MenuItem, InputLabel, FormControl, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import '../Assets/Styles/AddAnnouncement.css'
const AddAnnoucment = ({ open, handleClose, appList }) => {
    const [content, setContent] = useState(() => EditorState.createEmpty());
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [apprenticeship, setApprenticeship] = useState(appList[0].ID);
    const [annoucmentContantOpen, setAnnoucmentContantOpen] = useState(false);
    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth);
        });
        return () => window.removeEventListener('resize', () => {
            setWindowWidth(window.innerWidth);
        });
    }, []);

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className='center-modal' sx={{ background: 'white' }}>
                <h3 className="text-center p-3">Add Annoucment</h3>
                <form className="p-3">
                    <FormControl className="mb-3 form-control">
                        <InputLabel id='ApprenticeshipListLebal'>Apprenticeship</InputLabel>
                        <Select labelId="ApprenticeshipListLebal" label="Apprenticeship" variant='outlined'
                            value={apprenticeship}
                            onChange={e => setApprenticeship(e.target.value)}>
                            {appList && appList.map(app => <MenuItem key={app.ID} value={app.ID}>{app.Name}</MenuItem >)}
                        </Select>
                    </FormControl>
                    <div className="mb-3">
                        <label htmlFor="subject" className="form-label">Subject</label>
                        <input type="text" className="form-control" id="subject" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Content</label>
                        <Editor id="content"
                            editorState={content}
                            placeholder="Apprenticeship Description"
                            wrapperClassName={windowWidth > 990 ? '' : 'd-none'}
                            editorClassName="border editor-text-editor annoucment-editor"
                            onEditorStateChange={setContent} />
                        <Button variant="contained" className={windowWidth > 990 ? 'd-none' : 'mb-3 text-center'} sx={{ width: '100%' }} onClick={() => setAnnoucmentContantOpen(true)}>Add Contant</Button>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Add</button>
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