import { Alert, Box, Button, Checkbox, FormControl, FormControlLabel, Modal, Typography, duration } from "@mui/material";
import { useEffect, useState } from "react";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../Assets/Styles/AddApprenticeship.css';
import { ActionSuccessfully, UtilApprenticeshipDescription, UtilApprenticeshipPicture } from "./ApprenticeshipUtils";
const AddApprenticeship = ({ open, handleClose, setSnackBarInfo, setAppList }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [appTitle, setAppTitle] = useState('');
    const [appDescription, setAppDescription] = useState(() => EditorState.createEmpty());
    const [appPrice, setAppPrice] = useState('');
    const [appDuration, setAppDuration] = useState();
    const [appDurationType, setAppDurationType] = useState('Type');
    const [appStartDate, setAppStartDate] = useState('');
    const [appEndDate, setAppEndDate] = useState('');
    const [freeTrial, setFreeTrial] = useState(false);
    const [appFreeTrial, setAppFreeTrial] = useState('');
    const [learningMethod, setLearningMethod] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [appPictures, setAppPictures] = useState([]);
    const [appDescriptionModalOpen, setAppDescriptionModalOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [id, setId] = useState(null);
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

    useEffect(() => {
        if (user) {
            fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/addresses/${user.id}`)
                .then(res => res.json())
                .then(data => {
                    setAddresses(data);
                }).catch(err => console.log(err));
        }
    }, []);


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

    const verifyData = () => {
        const validationRules = [
            { condition: appTitle === '', message: 'Please enter a title' },
            { condition: appDescription.getCurrentContent().getPlainText() === '', message: 'Please enter a description' },
            { condition: appPrice === '', message: 'Please enter a price' },
            { condition: appPrice < 0, message: 'Price cannot be negative' },
            { condition: appDuration === '', message: 'Please enter a duration' },
            { condition: appDurationType === null, message: 'Please select a duration type' },
            { condition: appDuration < 1, message: 'Duration cannot be negative Or 0'},
            { condition: appDurationType === 'Type', message: 'Please enter a start date' },
            { condition: appStartDate === '', message: 'Please enter a start date' },
            { condition: appEndDate === '', message: 'Please enter an end date' },
            { condition: freeTrial && appFreeTrial === '', message: 'Please enter a free trial duration' },
            { condition: freeTrial && appFreeTrial < 1, message: 'Free Trial duration cannot be negative Or 0' },
            { condition: freeTrial && appFreeTrial > 7, message: 'Maxmimum free trial duration is 7 days' },
            { condition: learningMethod === '', message: 'Please enter a learning method' },
            { condition: selectedCategory === null, message: 'Please select a category' },
            { condition: appPictures.length === 0, message: 'Please upload at least one picture' },
            { condition: learningMethod !== 'Online' && selectedAddress === null, message: 'Please select an address' },
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
        const duration = appDurationType === 'Weeks' ? appDuration * 7 : appDurationType === 'Months' ? appDuration * 30 : appDuration * 365;
        endDate.setDate(startDate.getDate() + duration);
        setAppStartDate(startDate.toISOString().split('T')[0]);
        setAppEndDate(endDate.toISOString().split('T')[0]);
    }

    const countDays = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const duration = appDurationType === 'Weeks' ? appDuration * 7 : appDurationType === 'Months' ? appDuration * 30 : appDuration * 365;
        return diffDays === duration;
    }

    const addApprenticeship = () => {
        if (!verifyData()) return;
        if(!countDays(appStartDate, appEndDate)) return setSnackBarInfo({ severity: 'error', message: 'Start date and End date do not match the duration', open });
        const appDescriptionHTML = draftToHtml(convertToRaw(appDescription.getCurrentContent()));
        const Method = learningMethod === 'Online' ? 1 : learningMethod === 'On-Site' ? 2 : 3;
        var apprenticeship = {
            Name: appTitle,
            Price: appPrice,
            Description: appDescriptionHTML,
            Duration: appDuration,
            DurationType: appDurationType,
            LearningMethod: Method,
            isSimulation: false,
            Owner_ID: user.id,
            Category_ID: selectedCategory,
            Address_ID: learningMethod === 'Online' ? null : selectedAddress,
            Start_Date: appStartDate,
            End_Date: appEndDate,
            FreeTrial: freeTrial ? appFreeTrial : 0,
            enrolledStudentsCount: 0,
        }
        const appData = new FormData();
        appData.append('apprenticeship', JSON.stringify(apprenticeship));
        appPictures.forEach((picture, index) => {
            appData.append('pictures', picture, `${picture.name}`);
        });
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/addApprenticeship`, {
            method: 'POST',
            headers: {
                authorization: localStorage.getItem('token'),
                folderName: (user.Username + appTitle).replace(' ', '')
            },
            body: appData
        }).then(res => res.json())
            .then(data => {
                if (data.success) {
                    setSnackBarInfo({ severity: 'success', message: data.message, open });
                    setSuccess(true);
                    setId(data.ID);
                    apprenticeship.ID = data.ID;
                    setAppList(prevList => [...prevList,  apprenticeship ]);
                    setTimeout(() => {
                        setSuccess(false);
                        modalClosed();
                    }, 2000);
                }
                else
                    setSnackBarInfo({ severity: 'error', message: data.message, open });
            }
            ).catch(err => console.log(err));
    }


    const modalClosed = () => {
        handleClose();
        setAppPictures([]);
        setAppTitle('');
        setAppDescription(() => EditorState.createEmpty());
        setAppPrice('');
        setAppDuration('');
        setAppDurationType(null);
        setAppStartDate('');
        setAppEndDate('');
        setFreeTrial(false);
        setAppFreeTrial('');
        setSelectedCategory(null);
    }

    return (
        <Modal open={open} onClose={modalClosed}>
            <Box className={windowWidth > 768 ? 'center-modal' : 'container p-3 add-app-mobile scroll-add-app'} sx={{ background: 'white', borderRadius: '8px' }}>
                <Typography variant="h4" className="text-center mb-3 mt-2 ps-2 pe-2">Add Apprenticeship</Typography>
                <div className={windowWidth > 990 ? 'row' : ''}>
                    <div className="col">
                        <input type="text" placeholder="Apprenticeship Title" className="form-control mt-3 mb-3" value={appTitle} onChange={(e) => setAppTitle(e.target.value)} />
                        <Editor editorState={appDescription}
                            placeholder="Apprenticeship Description"
                            wrapperClassName={windowWidth > 990 ? '' : 'd-none'}
                            editorClassName={"border " + (windowWidth > 990 ? 'editor-text-editor' : '')}
                            onEditorStateChange={setAppDescription} />
                        <Button variant="contained" className={windowWidth > 990 ? 'd-none' : 'mb-3 text-center'} sx={{ width: '100%' }} onClick={() => setAppDescriptionModalOpen(true)}>Add Description</Button>
                    </div>
                    <div className="col">
                        <input type="number" placeholder="Apprenticeship Price(USD)" className={"form-control mb-3 " + (windowWidth > 990 ? 'mt-3' : '')} value={appPrice} onChange={(e) => setAppPrice(e.target.value)} />
                        <div className="row mb-3">
                            <div className="col-8">
                                <input type="number" placeholder="Apprenticeship Duration" className="form-control" value={appDuration} onChange={(e) => setAppDuration(e.target.value)}
                                onBlur={() => setStartAndEndDate(appStartDate)} />
                            </div>
                            <div className="col">
                                <select id="duration" className="form-control" onChange={(e) => setAppDurationType(e.target.value)} onBlur={() => setStartAndEndDate(appStartDate)}>
                                    <option value='Type'>Type</option>
                                    <option value="Weeks">Weeks</option>
                                    <option value="Months">Months</option>
                                    <option value="Years">Years</option>
                                </select>
                            </div>
                        </div>
                        <h6 className="mb-2">Apprenticeship Start Date</h6>
                        <input type="date" className="form-control mb-3" value={appStartDate} onChange={(e) => setStartAndEndDate(e.target.value)} disabled={appDuration === undefined? true : appDurationType === 'Type'? true : false} />
                        <h6 className="mb-2">Apprenticeship End Date</h6>
                        <input type="date" className="form-control mb-3" value={appEndDate} disabled />
                        <select className="form-control mb-3" onChange={(e) => setLearningMethod(e.target.value)}>
                            <option value="">Select Learning Method</option>
                            <option value="Online">Online</option>
                            <option value="On-Site">On-Site</option>
                            <option value="Online&On-Site">Online&On-Site</option>
                        </select>
                        {learningMethod !== 'Online' && learningMethod !== '' && <select className="form-control mb-3" onChange={(e) => setSelectedAddress(e.target.value)}>
                            <option value="">Select Address</option>
                            {addresses.length > 0 && addresses.map(address => <option key={address.ID} value={address.ID}>{address.City + ' ' + address.Street_Name}</option>)}
                        </select>}
                        <div>
                            <FormControl>
                                <FormControlLabel control={<Checkbox checked={freeTrial} onChange={(e) => setFreeTrial(e.target.checked)} />} label="Would you like to have free trial?" className="mb-1" />
                            </FormControl>
                            {freeTrial && <input type="number" placeholder="Free Trial Duration(In Days)" className="form-control mb-3" value={appFreeTrial} onChange={(e) => setAppFreeTrial(e.target.value)} />}
                        </div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="category" className="mb-1">Category</label>
                                <select id="category" className="form-control mb-3" onChange={(e) => setSelectedCategory(e.target.value)}>
                                    <option value="">Select Category</option>
                                    {categoryList.map(category => <option key={category.ID} value={category.ID}>{category.Name}</option>)}
                                </select>
                            </div>
                        </div>
                        <label htmlFor="appPicturesUploaded" className="form-label">Upload Apprenticeship Picture</label>
                        <input className="form-control mb-3" type="file" id="appPicturesUploaded" multiple
                            accept="image/*"
                            onChange={e => {
                                if (e.target.files.length === 0) return;
                                if (e.target)
                                    if (e.target.files.length > 5 || appPictures.length + e.target.files.length > 5) {
                                        setSnackBarInfo({ severity: "error", message: "You can upload maximum 5 pictures", open: true });
                                    }
                                    else {
                                        handleUploadImage(e)
                                    }
                            }} />
                    </div>
                </div>
                <div className="col">
                    {appPictures.map(picture => <UtilApprenticeshipPicture key={picture.name} picture={picture} setAppPictures={setAppPictures} />)}
                </div>
                <Alert severity="info" className="mb-3 mt-3">We will have to approve apprenticeship before our users can access it</Alert>
                <div className="row mt-3">
                    <div className="col text-center">
                        <Button variant="contained" color="success" className="col-3 ms-auto me-3" onClick={addApprenticeship}>Add</Button>
                        <Button variant="contained" color="error" className="col-3 me-auto ms-3" onClick={modalClosed}>Cancel</Button>
                    </div>
                </div>
                <UtilApprenticeshipDescription open={appDescriptionModalOpen} handleClose={() => setAppDescriptionModalOpen(false)} description={appDescription} setDescription={setAppDescription} />
                {success && <ActionSuccessfully open={success} handleClose={() => setSuccess(false)} ID={id} action={"Added"} />}
            </Box>
        </Modal>
    )
}



export default AddApprenticeship;