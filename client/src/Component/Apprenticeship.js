import RatingIcon from '../Assets/Images/RatingIcon.svg';
import { Link } from 'react-router-dom';

const Apprenticeship = ({ app }) => {
    return (
        <>
            {app && <Link className="result" to={'/Apprenticeship/' + app.ID} >
                <img className="result-img" src={app.img} />
                <div className="row result-info">
                    <h5 className="mt-2">{app.Name}</h5>
                    <h6>{app.Price === 0? 'Free': 'Price:' + app.Price + '$'}</h6>
                </div>
                <div className="row me-auto rating-info">
                    <img className="rating-star" src={RatingIcon} />
                    <span>4.5</span>
                </div>
            </Link>}
        </>
    )
}

export default Apprenticeship;