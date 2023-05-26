import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OwnerFirstTimeLogin from "../Component/OwnerFirstTimeLogin";
import "../Assets/Styles/OwnerHome.css";
import Networking from '../Assets/Images/NetworkingExample.png';
import GrahpicDesign from '../Assets/Images/GraphicDesignExample.png';
import Carpenters from '../Assets/Images/CarpentersExample.png';
import { Button, Collapse, List, ListItem, ListItemButton, ListItemText, ListSubheader, Rating, Typography } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";


function OwnerHome({ user, ownerInfo, setOwnerInfo, setSnackBarInfo }) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }
        if (user.User_Type !== 2) {
            navigate('/');
            return;
        }
    }, [user, ownerInfo]);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])
        

    const [appListOpen, setAppListOpen] = useState(windowWidth > 768 ? true : false);
    const [lastReviewsOpen, setLastReviewsOpen] = useState(windowWidth > 768 ? true : false);
    const [appList, setAppList] = useState([{ ID: 1, title: 'Networking', img: Networking, rating: "4.5 (100 Rating)", price: '60$', category: 'Networking' }
        , { ID: 2, title: 'Graphic Design', img: GrahpicDesign, rating: "4.5 (100 Rating)", price: '60$', category: 'Graphic Design' }
        , { ID: 3, title: 'Carpenters', img: Carpenters, rating: "4.5 (100 Rating)", price: '60$', category: 'Carpenters' }
        , { ID: 3, title: 'Networking', img: Networking, rating: "4.5 (100 Rating)", price: '60$' }
        , { ID: 3, title: 'Graphic Design', img: GrahpicDesign, rating: "4.5 (100 Rating)", price: '60$', category: 'Graphic Design' }
        , { ID: 3, title: 'Carpenters', img: Carpenters, rating: "4.5 (100 Rating)", price: '60$', category: 'Carpenters' }
        , { ID: 3, title: 'Networking', img: Networking, rating: "4.5 (100 Rating)", price: '60$', category: 'Networking' }
        , { ID: 3, title: 'Graphic Design', img: GrahpicDesign, rating: "4.5 (100 Rating)", price: '60$', category: 'Graphic Design' }
        , { ID: 3, title: 'Carpenters', img: Carpenters, rating: "4.5 (100 Rating)", price: '60$', category: 'Carpenters' }]);

    const [lastReviews, setLastReviews] = useState([{ ID: 1, user: 'Mohamad',course: 'Networking', rating: "4.5", price: '60$', category: 'Networking' }
        , { ID: 2, user: 'Mohamad',course: 'Graphic Design', rating: "4.5", price: '60$', category: 'Graphic Design' }
        , { ID: 3, user: 'Mohamad',course: 'Carpenters', rating: "3", price: '60$', category: 'Carpenters' }
        , { ID: 3, user: 'Mohamad',course: 'Networking', rating: "4.5", price: '60$', category: 'Networking' }]);

    return (
        <>
            {user && (ownerInfo.Picture !== null && ownerInfo.Picture !== '') && <div className="container-fluid owner-home">
                <div className="row me-auto ms-auto ">
                    <List className="mt-3 col me-3"
                        sx={{ width: '100%', maxWidth: 600 }}
                        component="nav"
                        subheader={
                            <ListSubheader component="div" className="list-sub-header card">
                                <ListItemButton className="app-list-header" onClick={() => setAppListOpen(!appListOpen)} sx={{ padding: '0' }}>
                                    <div className="list-text">
                                        <Typography variant="h5" className="ms-2">My Apprenticeships</Typography>
                                        <Typography variant="h6" className="ms-2">Total: {appList.length}</Typography>
                                    </div>
                                    {appListOpen ? <ExpandLess className="ms-auto me-3" /> : <ExpandMore className="ms-auto me-3" />}
                                </ListItemButton>
                            </ListSubheader>
                        }
                    >
                        <Collapse in={appListOpen} timeout="auto" unmountOnExit className="border pb-3">
                            {appList.map((app, index) => <OwnerApprenticeship key={index} app={app} />)}
                        </Collapse>
                    </List>
                    <div className={(windowWidth < 768? 'row' : 'col')} style={{paddingRight : 0}}>
                        <List className="mt-3 "
                            sx={{ width: '100%', maxWidth: 600 }}
                            component="nav"
                            subheader={
                                <ListSubheader component="div" className="list-sub-header card">
                                    <ListItemButton className="review-list-header" onClick={() => setLastReviewsOpen(!lastReviewsOpen)} sx={{ padding: '0' }}>
                                        <div className="list-text">
                                            <Typography variant="h5" className="ms-2">Lastest Reviews</Typography>
                                        </div>
                                        {lastReviewsOpen ? <ExpandLess className="ms-auto me-3" /> : <ExpandMore className="ms-auto me-3" />}
                                    </ListItemButton>
                                </ListSubheader>
                            }
                        >
                            <Collapse in={lastReviewsOpen} timeout="auto" unmountOnExit className="border pb-3">
                                {lastReviews.map((review, index) => <Review key={index} review={review} windowWidth={windowWidth} />)}
                            </Collapse>
                        </List>
                    </div>
                </div>
            </div>}
            {user && (ownerInfo.Picture === null || ownerInfo.Picture === '') && <OwnerFirstTimeLogin user={user} ownerInfo={ownerInfo} setOwnerInfo={setOwnerInfo} setSnackBarInfo={setSnackBarInfo} />}
        </>
    )
}

const OwnerApprenticeship = ({ app }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            {app !== null && <ListItemButton onClick={() => setOpen(!open)} className="me-2 ms-2 mt-3 app-owner-home border-bottom">
                <ListItemText primary="Networking" />
                <ListItemText primary="Student: 60" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>}
            {app !== null && <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding className="text-center mt-2 mb-2">
                    <Button variant="contained" color="success" className="mt-1">View</Button>
                    <Button variant="contained" color="warning" className="ms-3 mt-1">View Students</Button>
                    <Button variant="contained" className="ms-3 mt-1">Edit</Button>
                    <Button variant="contained" color="error" className="ms-3 mt-1">Delete</Button>
                </List>
            </Collapse>}
        </>
    )
}

const Review = ({ review, windowWidth }) => { 
    return (
        <>
            {review !== null && <ListItemButton className="me-2 ms-2 mt-3 app-owner-home border-bottom">
                <ListItemText primary={
                    windowWidth < 768 ? review.user.split(' ')[0] : review.user
                }/>
                <ListItemText primary="Networking (part 1)" className="ms-1 me-1"/>
                <Rating name="read-only" value={review.rating} readOnly className="ms-auto" />
                <ListItemText primary={review.rating} className="ms-1" />
                </ListItemButton>
            }
        </>
    )
}


export default OwnerHome;