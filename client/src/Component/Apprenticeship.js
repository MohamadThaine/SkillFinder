import RatingIcon from '../Assets/Images/RatingIcon.svg';
import { Link } from 'react-router-dom';

const Apprenticeship = ({ app , page }) => {
    return (
        <>
            {app && <Link className="result" to={'/Apprenticeship/' + app.ID} >
                <img className="result-img" src={app.img} />
                <div className="row result-info">
                    <h5 className="mt-2">{app.Name}</h5>
                    {page === 'search' && <h6>{app.Price === 0? 'Free': 'Price:' + app.Price + '$'}</h6>}
                </div>
                {page === 'search' && <div className="row me-auto rating-info">
                    <img className="rating-star" src={RatingIcon} />
                    <span>{app.AverageRating === null? 'No Reviews': `${app.AverageRating} (${app.No_Of_Reviews} Reviews)`}</span>
                </div>}
            </Link>}
        </>
    )
}

export default Apprenticeship;