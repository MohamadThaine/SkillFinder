import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OwnerFirstTimeLogin from "../Component/OwnerFirstTimeLogin";
import { Box, Button, Collapse, List, ListItemButton, ListItemText, ListSubheader, Modal, Rating, Typography } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import AddApprenticeship from "../Component/AddApprenticeship";
import AddAddress from "../Component/AddAddress";
import "../Assets/Styles/OwnerHome.css";
import EditApprenticeship from "../Component/EditApprenticeship";
import OwnerList from "../Component/OwnerList";

function OwnerHome({ user, ownerInfo, setOwnerInfo, setSnackBarInfo }) {
    const [loading, setLoading] = useState(true);
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
    const [requestsOpen, setRequestsOpen] = useState(windowWidth > 768 ? true : false);
    const [addAppOpen, setAddAppOpen] = useState(false);
    const [addAddressOpen, setAddAddressOpen] = useState(false);
    const [appList, setAppList] = useState([]);
    const [lastReviews, setLastReviews] = useState([{ ID: 1, user: 'Mohamad', course: 'Networking', rating: 3, price: '60$', category: 'Networking' }
        , { ID: 2, user: 'Mohamad', course: 'Graphic Design', rating: 3, price: '60$', category: 'Graphic Design' }
        , { ID: 3, user: 'Mohamad', course: 'Carpenters', rating: 3, price: '60$', category: 'Carpenters' }
        , { ID: 3, user: 'Mohamad', course: 'Networking', rating: 3, price: '60$', category: 'Networking' }]);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/apprenticeships/all/${user.id}`)
            .then(response => response.json())
            .then(data => {
                setAppList(data);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/enrollRequests/all/${user.id}/0`, {
            method: 'GET',
            headers: {
                authorization: localStorage.getItem('token'),
            }})
            .then(response => response.json())
            .then(data => {
                setRequests(data);
            });
    }, []);


    return (
        <>
            {loading && <span className="loader" />}
            {user && !loading && (ownerInfo.Picture !== null && ownerInfo.Picture !== '') && <div className="container-fluid owner-home">
                <div className="row me-auto ms-auto ">
                    <OwnerList title='My Apprenticeships' list={appList} setList={setAppList} listType='app' setSnackBarInfo={setSnackBarInfo}
                        headerClassName='app-list-header' listOpen={appListOpen} setListOpen={setAppListOpen}
                        listClassName='mt-3 col me-3' />
                    <div className={(windowWidth < 768 ? 'row' : 'col')} style={{ paddingRight: 0 }}>
                        <OwnerList title='Last Reviews' list={lastReviews} setList={setLastReviews} listType='review' setSnackBarInfo={setSnackBarInfo}
                            headerClassName='review-list-header' listOpen={lastReviewsOpen} setListOpen={setLastReviewsOpen}
                            listClassName='mt-3' windowWidth={windowWidth} />
                    </div>
                    <div className={(windowWidth < 768 ? 'row' : 'col')} style={{ paddingRight: 0 }}>
                        <OwnerList title='Requests' list={requests} setList={setRequests} listType='request' setSnackBarInfo={setSnackBarInfo}
                            headerClassName='request-list-header' listOpen={requestsOpen} setListOpen={setRequestsOpen}
                            listClassName='mt-3'/>
                    </div>
                    <div className="col mt-3 mb-3">
                        <div className="text-center">
                            <Button variant="contained" color="success" onClick={() => setAddAppOpen(true)} style={{ width: '20rem' }}>
                                <Typography variant="h6">Add New Apprenticeship</Typography>
                            </Button>
                        </div>
                        <div className="mt-2 text-center">
                            <Button variant="contained" color="error" onClick={() => setAddAddressOpen(true)} style={{ width: '20rem' }}>
                                <Typography variant="h6" >Add New Address</Typography>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>}
            {user && (ownerInfo.Picture !== null && ownerInfo.Picture !== '') && addAppOpen && <AddApprenticeship open={addAppOpen} handleClose={() => setAddAppOpen(false)} setSnackBarInfo={setSnackBarInfo} setAppList={setAppList} />}
            {user && (ownerInfo.Picture === null || ownerInfo.Picture === '') && <OwnerFirstTimeLogin user={user} ownerInfo={ownerInfo} setOwnerInfo={setOwnerInfo} setSnackBarInfo={setSnackBarInfo} />}
            {user && (ownerInfo.Picture !== null && ownerInfo.Picture !== '') && addAddressOpen && <AddAddress open={addAddressOpen} handleClose={() => setAddAddressOpen(false)} setSnackBarInfo={setSnackBarInfo} />}
        </>
    )
}




export default OwnerHome;