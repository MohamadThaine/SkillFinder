import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Apprenticeship from "../Component/Apprenticeship";
const UserApprenticeships = ({ user }) => {
    const navigate = useNavigate();
    const [apprenticeships, setApprenticeships] = useState([]);
    useEffect(() => {
        if (user == null) {
            navigate('/');
        }
    }, [])

    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/getUserApprenticeships/${user.id}`, {
            method: 'GET',
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    console.log(res.error);
                    return;
                }
                setApprenticeships(res.apprenticeships);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <>
            <h1 className="text-center">Your Apprenticeships</h1>
            <div className="row result-row ms-3 mb-3">
                {apprenticeships && apprenticeships.map(apprenticeship => {
                    return <Apprenticeship key={apprenticeship.ID} app={apprenticeship} page='userApp' />
                })}
                {!apprenticeships && <h3 className="text-center mt-3">You have no apprenticeships</h3>}
            </div>
        </>
    )
}

export default UserApprenticeships