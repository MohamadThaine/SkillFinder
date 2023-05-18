import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OwnerFirstTimeLogin from "../Component/OwnerFirstTimeLogin";
function OwnerHome({user, ownerInfo,  setOwnerInfo,setSnackBarInfo}) {
    const navigate = useNavigate();
    useEffect(() => {
        if(!user && !ownerInfo.Major){
            navigate('/');
        }
    }, [user, ownerInfo]);

    return (
        <>
            {user && <div className="container">
                
            </div>}
            {user && (ownerInfo.Picture === null || ownerInfo.Picture === '') && <OwnerFirstTimeLogin user={user} ownerInfo={ownerInfo} setOwnerInfo={setOwnerInfo} setSnackBarInfo={setSnackBarInfo}/>}
        </>
    )
}
            

export default OwnerHome;