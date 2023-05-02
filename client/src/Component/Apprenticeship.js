import RatingIcon from '../Assets/Images/RatingIcon.svg';
import {Link} from 'react-router-dom';

const Apprenticeship = ({app}) => {
    return(
        <Link className="result" to={'/Apprenticeship/' + app.ID} >
            <img className="result-img" src={app.img} />
            <div className="row result-info">
                <h5 className="mt-2">{app.title}</h5>
                <h6>Price: {app.price}</h6>
            </div>
            <div className="row me-auto rating-info">
                <img className="rating-star" src={RatingIcon} />
                <span>{app.rating}</span>
            </div>
        </Link>
    )
}

export default Apprenticeship;