import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button, FormControl, FormControlLabel, Checkbox } from '@mui/material';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { ActionSuccessfully, UtilApprenticeshipDescription, UtilApprenticeshipPicture } from './ApprenticeshipUtils';

const EditApprenticeship = ({ open, handleClose, apprenticeship, setApprenticeshipList, setSnackBarInfo }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [apprenticeshipCopy, setApprenticeshipCopy] = useState(apprenticeship);
    const [appDescription, setAppDescription] = useState(EditorState.createEmpty());
    const [addresses, setAddresses] = useState([]);
    const [appPictures, setAppPictures] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [freeTrial, setFreeTrial] = useState(apprenticeship.FreeTrial > 0 ? true : false);
    const [success, setSuccess] = useState(false);
    const [appDescriptionModalOpen, setAppDescriptionModalOpen] = useState(false);
    const [folderName, setFolderName] = useState('');
    useEffect(() => {
        if (user) {
            fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/addresses/${user.id}`)
                .then(res => res.json())
                .then(data => {
                    setAddresses(data);
                }).catch(err => console.log(err));
        }
    }, []);

    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/apprenticeship-pics/` + apprenticeshipCopy.ID)
            .then(res => res.json())
            .then(data => {
                setAppPictures(data);
                setFolderName(data[0].split('\\')[1]);
            })
    }, [])

    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/categories`)
            .then(res => res.json())
            .then(data => {
                setCategoryList(data);
            }).catch(err => console.log(err));
    }, [])

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth);
        });
    }, []);

    const handleInputChange = (field, value) => {
        setApprenticeshipCopy({ ...apprenticeshipCopy, [field]: value });
    };

    const handleUploadImage = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                let nameCounter = 1;
                const base64String = reader.result;
                if (!base64String.startsWith("data:image")) return;
                appPictures.forEach(pic => {
                    const fileName = pic.name ? pic.name : pic.slice(pic.lastIndexOf("\\") + 1);
                    if (fileName === file.name) nameCounter++;
                });
                if (nameCounter > 1) {
                    const [fileName, fileExtension] = file.name.split('.');
                    const newFileName = `${fileName}(${nameCounter}).${fileExtension}`;
                    file = new File([file], newFileName, { type: file.type });
                }
                setAppPictures(prevPictures => [...prevPictures, file]);
            }
            reader.readAsDataURL(file);
        });
    }

    useEffect(() => {
        const blocksFromHtml = htmlToDraft(apprenticeshipCopy.Description);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        setAppDescription(EditorState.createWithContent(contentState));
    }, []);

    const verifyData = () => {
        const validationRules = [
            { condition: apprenticeshipCopy.Name === '', message: 'Please enter a title' },
            { condition: appDescription.getCurrentContent().getPlainText() === '', message: 'Please enter a description' },
            { condition: apprenticeshipCopy.Price === '', message: 'Please enter a price' },
            { condition: apprenticeshipCopy.Price < 0, message: 'Price cannot be negative' },
            { condition: apprenticeshipCopy.Duration === '', message: 'Please enter a duration' },
            { condition: apprenticeshipCopy.DurationType === null, message: 'Please select a duration type' },
            { condition: apprenticeshipCopy.Start_Date === '', message: 'Please enter a start date' },
            { condition: apprenticeshipCopy.End_Date === '', message: 'Please enter an end date' },
            { condition: freeTrial && apprenticeshipCopy.FreeTrial === '', message: 'Please enter a free trial duration' },
            { condition: freeTrial && apprenticeshipCopy.FreeTrial < 1, message: 'Free Trial duration cannot be negative Or 0' },
            { condition: freeTrial && apprenticeshipCopy.FreeTrial > 7, message: 'Free Trial Duration cant be more than 7 days' },
            { condition: apprenticeshipCopy.LearningMethod === '', message: 'Please enter a learning method' },
            { condition: apprenticeshipCopy.Category_ID === '', message: 'Please select a category' },
            { condition: appPictures.length === 0, message: 'Please upload at least one picture' },
            { condition: apprenticeshipCopy.LearningMethod !== 'Online' && apprenticeshipCopy.Address_ID === '', message: 'Please select an address' },
        ];
        for (const { condition, message } of validationRules) {
            if (condition) {
                setSnackBarInfo({ severity: 'error', message, open });
                return false;
            }
        }
        return true;
    }

    const setStartAndEndDate = (date) => {
        if(date === null || date === '') return;
        const startDate = new Date(date);
        const endDate = new Date(date);
        const duration = apprenticeshipCopy.DurationType === 'Weeks' ? apprenticeshipCopy.Duration * 7 : apprenticeshipCopy.DurationType === 'Months' ? apprenticeshipCopy.Duration * 30 : apprenticeshipCopy.Duration * 365;
        endDate.setDate(startDate.getDate() + duration);
        handleInputChange('Start_Date', startDate.toISOString().split('T')[0]);
        handleInputChange('End_Date', endDate.toISOString().split('T')[0]);
    }

    const countDays = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const duration = apprenticeshipCopy.DurationType === 'Weeks' ? apprenticeshipCopy.Duration * 7 : apprenticeshipCopy.DurationType === 'Months' ? apprenticeshipCopy.Duration * 30 : apprenticeshipCopy.Duration * 365;
        return duration - diffDays < 5;
    }

    const handleSave = () => {
        if (!verifyData()) return;
        if(!countDays(apprenticeshipCopy.Start_Date, apprenticeshipCopy.End_Date)) return setSnackBarInfo({ severity: 'error', message: 'Start date and End date do not match the duration', open });
        const EditedApprenticeship = {
            ID: apprenticeshipCopy.ID,
            Name: apprenticeshipCopy.Name,
            Price: apprenticeshipCopy.Price,
            Description: draftToHtml(convertToRaw(appDescription.getCurrentContent())),
            isApproved: apprenticeshipCopy.isApproved,
            Duration: apprenticeshipCopy.Duration,
            DurationType: apprenticeshipCopy.DurationType,
            LearningMethod: apprenticeshipCopy.LearningMethod,
            isSimulation: apprenticeshipCopy.isSimulation,
            Owner_ID: user.id,
            Category_ID: apprenticeshipCopy.Category_ID,
            Address_ID: apprenticeshipCopy.Address_ID,
            Start_Date: apprenticeshipCopy.Start_Date,
            End_Date: apprenticeshipCopy.End_Date,
            FreeTrial: freeTrial ? apprenticeshipCopy.FreeTrial : 0
        };
        const editData = new FormData();
        editData.append('apprenticeship', JSON.stringify(EditedApprenticeship));
        appPictures.forEach((picture, index) => {
            picture.name ? editData.append('pictures', picture, `${picture.name}`) : editData.append('oldPictures', picture.split(/[\\/]/).slice(3).join('/').replace(/\//g, '\\'));
        });
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/editApprenticeship/${apprenticeshipCopy.ID}`, {
            method: 'PUT',
            headers: {
                folderName: (user.Username + apprenticeshipCopy.Name).replace(' ', ''),
                authorization: localStorage.getItem('token')
            },
            body: editData
        }).then(res => res.json())
            .then(data => {
                if (data.success) {
                    setSuccess(true);
                    setApprenticeshipList(prevList => {
                        const newList = prevList.map(apprenticeship => {
                            if (apprenticeship.ID === apprenticeshipCopy.ID)
                                return apprenticeshipCopy;
                            return apprenticeship;
                        });
                        return newList;
                    });
                    setSnackBarInfo({ severity: 'success', message: 'Apprenticeship successfully edited!', open: true });
                    setTimeout(() => {
                        setSuccess(false);
                        handleClose();
                    }, 2000);
                }
            }).catch(err => {
                setSnackBarInfo({ severity: 'error', message: 'Error editing apprenticeship!', open: true })
                console.log(err);
            });
    };
    return (
        <Modal open={open} onClose={handleClose}>
            <Box className={windowWidth > 768 ? 'center-modal' : 'container p-3 add-app-mobile scroll-add-app'} sx={{ background: 'white', borderRadius: '8px' }}>
                <Typography variant="h4" className="text-center mb-3 mt-2 ps-2 pe-2">Edit Apprenticeship</Typography>
                <div className={windowWidth > 990 ? 'row' : ''}>
                    <div className="col">
                        <input
                            type="text"
                            placeholder="Apprenticeship Title"
                            className="form-control mt-3 mb-3"
                            value={apprenticeshipCopy.Name}
                            onChange={(e) => handleInputChange('Name', e.target.value)}
                        />
                        <Editor
                            editorState={appDescription}
                            placeholder="Apprenticeship Description"
                            wrapperClassName={windowWidth > 990 ? '' : 'd-none'}
                            editorClassName={"border " + (windowWidth > 990 ? 'editor-text-editor' : '')}
                            onEditorStateChange={(editorState) => {
                                setAppDescription(editorState);
                                setApprenticeshipCopy({ ...apprenticeshipCopy, Description: draftToHtml(convertToRaw(editorState.getCurrentContent())) });
                            }}
                        />
                        <Button
                            variant="contained"
                            className={windowWidth > 990 ? 'd-none' : 'mb-3 text-center'}
                            sx={{ width: '100%' }}
                            onClick={() => setAppDescriptionModalOpen(true)}
                        >
                            Edit Description
                        </Button>
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            placeholder="Apprenticeship Price(USD)"
                            className={"form-control mb-3 " + (windowWidth > 990 ? 'mt-3' : '')}
                            value={apprenticeshipCopy.Price}
                            onChange={(e) => handleInputChange('Price', e.target.value)}
                        />
                        <div className="row mb-3">
                            <div className="col-8">
                                <input
                                    type="number"
                                    placeholder="Apprenticeship Duration"
                                    className="form-control"
                                    value={apprenticeshipCopy.Duration}
                                    onBlur={() => setStartAndEndDate(apprenticeshipCopy.Start_Date)}
                                    onChange={(e) => handleInputChange('Duration', e.target.value)}
                                />
                            </div>
                            <div className="col">
                                <select
                                    id="duration"
                                    className="form-control"
                                    onChange={(e) => handleInputChange('DurationType', e.target.value)}
                                    onBlur={() => setStartAndEndDate(apprenticeshipCopy.Start_Date)}
                                    value={apprenticeship.DurationType === null ? '' : apprenticeship.DurationType}
                                >
                                    <option value="Type">Type</option>
                                    <option value="Weeks">Weeks</option>
                                    <option value="Months">Months</option>
                                    <option value="Years">Years</option>
                                </select>
                            </div>
                        </div>
                        <h6 className="mb-2">Apprenticeship Start Date</h6>
                        <input
                            type="date"
                            className="form-control mb-3"
                            value={apprenticeshipCopy.Start_Date}
                            onChange={(e) => setStartAndEndDate(e.target.value)}
                            disabled={apprenticeshipCopy.Duration === undefined? true : apprenticeshipCopy.DurationType === 'Type'? true : false}
                        />
                        <h6 className="mb-2">Apprenticeship End Date</h6>
                        <input
                            type="date"
                            className="form-control mb-3"
                            value={apprenticeshipCopy.End_Date}
                            onChange={(e) => handleInputChange('End_Date', e.target.value)}
                            disabled
                        />
                        <select
                            className="form-control mb-3"
                            onChange={(e) => handleInputChange('LearningMethod', e.target.value)}
                            value={apprenticeshipCopy.LearningMethod === null ? '' : apprenticeshipCopy.LearningMethod}
                        >
                            <option value="">Select Learning Method</option>
                            <option value="1">Online</option>
                            <option value="2">On-Site</option>
                            <option value="3">Online&On-Site</option>
                        </select>
                        {apprenticeshipCopy.LearningMethod > 1 && (
                            <select
                                className="form-control mb-3"
                                onChange={(e) => handleInputChange('Address_ID', e.target.value)}
                                value={apprenticeshipCopy.Address_ID === null ? '' : apprenticeshipCopy.LearningMethod === 1 ? '' : apprenticeshipCopy.Address_ID}
                            >
                                <option value="">Select Address</option>
                                {addresses.length > 0 &&
                                    addresses.map((address) => (
                                        <option key={address.ID} value={address.ID}>
                                            {address.City + ' ' + address.Street_Name}
                                        </option>
                                    ))}
                            </select>
                        )}
                        <div>
                            <FormControl>
                                <FormControlLabel
                                    control={<Checkbox checked={freeTrial} onChange={e => setFreeTrial(e.target.checked)} />}
                                    label="Would you like to have free trial?"
                                    className="mb-1"
                                />
                            </FormControl>
                            {freeTrial && (
                                <input
                                    type="number"
                                    placeholder="Free Trial Duration(In Days)"
                                    className="form-control mb-3"
                                    value={apprenticeshipCopy.FreeTrial}
                                    onChange={(e) => handleInputChange('FreeTrial', e.target.value)}
                                />
                            )}
                        </div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="category" className="mb-1">
                                    Category
                                </label>
                                <select
                                    id="category"
                                    className="form-control mb-3"
                                    onChange={(e) => handleInputChange('Category_ID', e.target.value)}
                                    value={apprenticeshipCopy.Category_ID === null ? '' : apprenticeshipCopy.Category_ID}
                                >
                                    <option value="">Select Category</option>
                                    {categoryList.map((category) => (
                                        <option key={category.ID} value={category.ID}>
                                            {category.Name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <label htmlFor="appPicturesUploaded" className="form-label">
                            Upload Apprenticeship Picture
                        </label>
                        <input
                            className="form-control mb-3"
                            type="file"
                            id="appPicturesUploaded"
                            multiple
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files.length === 0) return;
                                if (e.target) {
                                    if (e.target.files.length > 5 || appPictures.length + e.target.files.length > 5) {
                                        setSnackBarInfo({ severity: "error", message: "You can upload maximum 5 pictures", open: true });
                                    } else {
                                        handleUploadImage(e);
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="col">{appPictures.map((picture) => <UtilApprenticeshipPicture key={picture} picture={picture} setAppPictures={setAppPictures} action={"Edit"} />)}</div>
                <div className="row mt-3">
                    <div className="col text-center">
                        <Button variant="contained" color="success" className="col-3 ms-auto me-3" onClick={handleSave}>
                            Save
                        </Button>
                        <Button variant="contained" color="error" className="col-3 me-auto ms-3" onClick={handleClose}>
                            Cancel
                        </Button>
                    </div>
                </div>
                <UtilApprenticeshipDescription
                    open={appDescriptionModalOpen}
                    handleClose={() => setAppDescriptionModalOpen(false)}
                    description={appDescription}
                    setDescription={setAppDescription}
                />
                {success && <ActionSuccessfully open={success} handleClose={() => setSuccess(false)} ID={apprenticeshipCopy.ID} action={"Edited"} />}
            </Box>
        </Modal>
    );
};

export default EditApprenticeship;
