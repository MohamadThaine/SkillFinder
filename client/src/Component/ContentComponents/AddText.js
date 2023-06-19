import { Box, Modal, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

const AddText = ({ open, handleClose, setSnackBarInfo, appID, setResourceList }) => {
    const [content, setContent] = useState(() => EditorState.createEmpty());
    const [title, setTitle] = useState('');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [openTextEditor, setOpenTextEditor] = useState(false);
    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth);
        });
        return () => window.removeEventListener('resize', () => {
            setWindowWidth(window.innerWidth);
        });
    }, []);

    const verifyInput = () => {
        if (content.getCurrentContent().getPlainText() === '') {
            setSnackBarInfo({ severity: 'error', message: 'Please enter content', open });
            return false;
        }
        if(title === ''){
            setSnackBarInfo({ severity: 'error', message: 'Please enter title', open });
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!verifyInput()) return;
        const data = {
            Name: title,
            Content: draftToHtml(convertToRaw(content.getCurrentContent())),
            Apprenticeship_ID: appID
        }
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/addText`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token')
            },
            body: JSON.stringify(data),
        }).then(res => res.json()).then(data => {
            if (data.success) {
                setSnackBarInfo({ severity: 'success', message: 'Text added successfully', open });
                handleClose();
                setResourceList(prevState => {
                    const date = data.apprenticeshipResource.Date_Of_Creation.split('T')[0];
                    return {
                        ...prevState,
                        [date]: [...(prevState[date] || []), data.apprenticeshipResource]
                    };
                });
            } else {
                setSnackBarInfo({ severity: 'error', message: data.message, open });
            }
        }).catch(err => {
            console.log(err);
            setSnackBarInfo({ severity: 'error', message: 'Internal server error', open });
        });
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className='center-modal text-center' sx={{ background: 'white' }}>
                <h5>Add Text</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="textTitle" className="form-label">Title</label>
                        <input type="text" className="form-control" id="textTitle" onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Content</label>
                        <Editor
                            editorState={content}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName={windowWidth > 990 ? '' : 'd-none'}
                            editorClassName="border text-app-editor"
                            placeholder="Content"
                            onEditorStateChange={setContent}
                            id="content"
                        />
                        {windowWidth < 990 && <button type="button" className="btn btn-primary mt-3 mb-3 text-center ms-5 me-5" onClick={() => setOpenTextEditor(true)}>Add Content</button>}
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    <button type="button" className="btn btn-secondary ms-2" onClick={handleClose}>Cancel</button>
                </form>
                {openTextEditor && <TextEditor open={openTextEditor} handleClose={() => setOpenTextEditor(false)} content={content} setContent={setContent} />}
            </Box>
        </Modal>
    )
}

const TextEditor = ({ open, handleClose, content, setContent }) => {
    const [contentCopy, setContentCopy] = useState(content);
    return (
        <Modal open={open} onClose={() => {
            setContentCopy(content);
            handleClose();
        }}>
            <Box className='mb-3 text-center container landscape-app p-3 add-app-mobile' sx={{ background: 'white' }}>
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
    )
}

export default AddText;
